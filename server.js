const express = require('express');
const randomize = require('randomatic');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

const usersRouter = require('./routes/usuario');
const productsRouter = require('./routes/producto');
const direccionEnvioRouter = require('./routes/direccionEnvio');
const mascotaRouter = require('./routes/mascota');
const metodoPagoRouter = require('./routes/metodoPago');
const pedidoRouter = require('./routes/pedido');
const publicacionRouter = require('./routes/publicacion');

const User = require('./db/usuario');
const Token = require('./db/token');

let corsConfig = { origin: '*'};

app.use(cors(corsConfig));
app.use(express.json()); //middleware
app.use('/api/users', usersRouter); //las rutas en userRouter se pueden accesar a traves de /api/users
app.use('/api/products', authMiddleware);
app.use('/api/products', productsRouter);

app.use('/api/direccionEnvio', authMiddleware);
app.use('/api/direccionEnvio', direccionEnvioRouter);

app.use('/api/mascota', authMiddleware);
app.use('/api/mascota', mascotaRouter);

app.use('/api/metodoPago', authMiddleware);
app.use('/api/metodoPago', metodoPagoRouter);

app.use('/api/pedido', authMiddleware);
app.use('/api/pedido', pedidoRouter);

app.use('/api/publicacion', authMiddleware);
app.use('/api/publicacion', publicacionRouter);


// app.post('/api/login', function (req, res) {
//     res.send("hola crayola");
// });

app.post('/api/login', function (req, res) {
    // Programar aquí lógica de token
    User.find({correo: req.body.correo, password: req.body.password})
        .then(async users => {
            //aqui se genera el token
            if(users.length > 0) { //confirmar que regrese un usuario con esa combinacion de correo-password
                let user = users[0];
                let tokenString = randomize('Aa0','10')+'-'+user.id;

                await Token.findOneAndDelete({userId: user.id});
                let tokenDoc = Token({userId: user.id, token: tokenString});
                await tokenDoc.save();

                res.statusCode = 200;
                res.send({token: tokenString});
            } else { //el usuario ingreso mal alguno de los campos
                res.statusCode = 400;
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) { //autentica los usuarios
    if(!req.headers['x-auth-user']) { //pregunta por la existencia de este header
        res.statusCode = 401;
        res.send(req.headers);
    }
    else {
        // Validar que el token sea válido
        let tokenString = req.headers['x-auth-user'];
        let token = await Token.findOne({token: tokenString});
        if(token) { //si el token no es null
            req.userId = token.userId;
            let user = await User.findOne({id:token.userId});
            next();
        } else {
            res.statusCode = 401;
            res.end();
        }
    }
}
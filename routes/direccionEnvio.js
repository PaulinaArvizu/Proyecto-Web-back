const express = require('express');
const router = express.Router();
const dEnvio = require('../db/direccionEnvio');

router.route('/')
    .get((req, res) => {
        dEnvio.find()
            .then(denvio => {
                res.statusCode = 200;
                res.send(denvio);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newDEnvio = req.body;
        // Validar si vienen las propiedades
        if(!newDEnvio.nombreCompleto || !newDEnvio.direccion || !newDEnvio.subDireccion || !newDEnvio.ciudad || !newDEnvio.estado || !newDEnvio.CP || !newDEnvio.telefono) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre completo del comprador, direccion, subdireccion, ciudad, estado, Codigo postal, telefono');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombre
            // let sameEmailUser = JSON.parse(fs.readFileSync('./data/users.json')).filter(u => u.correo == newUser.correo); //readFileSync es sincrono: detiene el programa hasta que termina la instruccion
            let sameDireccion = await dEnvio.find({direccion: newDEnvio.direccion}); //con await, el codigo se espera hasta que sameEmailUser reciba la respuesta
            
            if(sameDireccion.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                let dEnvioDocument = dEnvio(newDEnvio); //utilizamos el modelo para crear un documento con el nuevo usuario
                dEnvioDocument.save() //se guarda en la base de datos
                    .then(denvio => {
                        res.statusCode = 201;
                        res.send(denvio);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    })
    .put(async function (req, res) {
        let putDirEnvio = req.body;
        dEnvio.findOneAndReplace({
                id: putDirEnvio.id
            }, putDirEnvio)
            .then(dEnvio => {
                res.statusCode = 200;
                res.send(dEnvio);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .patch(async function (req, res) {
        let patchDirEnvio = req.body;
        dEnvio.findOneAndUpdate({
                id: putDirEnvio.id
            }, patchDirEnvio)
            .then(dEnvio => {
                res.statusCode = 200;
                res.send(dEnvio);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .delete(async function (req, res) {
        let delDirEnvio = req.body;
        dEnvio.findOneAndDelete({
                id: putDirEnvio.id
            })
            .then(dEnvio => {
                res.statusCode = 200;
                res.send(dEnvio);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    });

module.exports = router;

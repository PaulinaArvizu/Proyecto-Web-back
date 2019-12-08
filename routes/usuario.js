const express = require('express');
const router = express.Router();
const Users = require('../db/usuario');

router.route('/')
    .get((req, res) => {
        Users.find()
            .then(users => {
                res.statusCode = 200;
                res.send(users);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newUser = req.body;
        // Validar si vienen las propiedades
        if(!newUser.correo || !newUser.nombre || !newUser.fecha || !newUser.password || !newUser.seguidores || !newUser.siguiendo || newUser.admin == undefined) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: correo, nombre, fecha, password, reportado, seguidores, siguiendo, admin y moderador.');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombre
            // let sameEmailUser = JSON.parse(fs.readFileSync('./data/users.json')).filter(u => u.correo == newUser.correo); //readFileSync es sincrono: detiene el programa hasta que termina la instruccion
            let sameEmailUser = await Users.find({correo: newUser.correo}); //con await, el codigo se espera hasta que sameEmailUser reciba la respuesta
            let sameNameUser = await Users.find({nombre: newUser.nombre});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                let userDocument = Users(newUser); //utilizamos el modelo para crear un documento con el nuevo usuario
                userDocument.save() //se guarda en la base de datos
                    .then(user => {
                        res.statusCode = 201;
                        res.send(user);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    })
    .put(async function (req, res) {
        let putUser = req.body;
        Users.findOneAndReplace({
                correo: putUser.correo
            }, putUser)
            .then(user => {
                res.statusCode = 200;
                res.send(user);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .patch(async function (req, res) {
        let patchUser = req.body;
        Users.findOneAndUpdate({
                correo: patchUser.correo
            }, patchUser)
            .then(user => {
                res.statusCode = 200;
                res.send(user);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .delete(async function (req, res) {
        let delUser = req.body;
        Users.findOneAndDelete({
                correo: delUser.correo
            })
            .then(user => {
                res.statusCode = 200;
                res.send(user);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    });

module.exports = router;
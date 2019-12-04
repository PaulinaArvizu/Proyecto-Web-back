const express = require('express');
const router = express.Router();
const Product = require('../db/producto');

router.route('/')
    .get((req, res) => {
        Product.find()
            .then(product => {
                res.statusCode = 200;
                res.send(product);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newProduct = req.body;
        // Validar si vienen las propiedades
        if(!newProduct.correo || !newProduct.nombre || !newProduct.fecha || !newProduct.password || !newProduct.reportado || !newProduct.seguidores || !newProduct.siguiendo || !newProduct.admin || !newProduct.moderador) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: correo, nombre, fecha, password, reportado, seguidores, siguiendo, admin y moderador.');
        }
        else {
            // Validar si existe un usuario con el mismo correo o nombres y apellidos
            let sameEmailUser = await Users.find({correo: newProduct.correo}); //con await, el codigo se espera hasta que sameEmailUser reciba la respuesta
            let sameNameUser = await Users.find({nombre: newProduct.nombre});

            if(sameEmailUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo correo');
            }
            else if(sameNameUser.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un usuario con el mismo nombre');
            }
            else {
                let userDocument = Usuario(newProduct); //utilizamos el modelo para crear un documento con el nuevo usuario
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
    });

module.exports = router;
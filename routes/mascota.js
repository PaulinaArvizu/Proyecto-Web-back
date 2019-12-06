const express = require('express');
const router = express.Router();
const Mascota = require('../db/mascota');

router.route('/')
    .get((req, res) => {
        Mascota.find()
            .then(mascota => {
                res.statusCode = 200;
                res.send(mascota);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
            let newMascota = req.body;
            // Validar si vienen las propiedades
            if (!newMascota.nombre || !newMascota.fecha || !newMascota.tipo || !newMascota.raza || !newMascota.img) {
                res.statusCode = 400;
                res.send('Las propiedades requeridas son: nombre de mascota, fecha de nacimiento, tipo, raza, tamaño e imagen.');
            } else {
                let mascotaDocument = Mascota(newMascota); //utilizamos el modelo para crear un documento con el nuevo producto
                mascotaDocument.save() //se guarda en la base de datos
                    .then(mascota => {
                        res.statusCode = 201;
                        res.send(mascota);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        console.log(reason);
                        res.end();
                    });
            }
        })
        .put(async function (req, res) {
            let putMascota = req.body;
            Mascota.findOneAndReplace({
                    id: putMascota.id
                }, putMascota)
                .then(mascota => {
                    res.statusCode = 200;
                    res.send(mascota);
                })
                .catch(reason => {
                    res.statusCode = 404;
                    res.end();
                })
        })
        .patch(async function (req, res) {
            let patchMascota = req.body;
            console.log(patchMascota);
            Mascota.findOneAndUpdate({
                    _id: patchMascota._id
                }, patchMascota)
                .then(mascota => {
                    res.statusCode = 200;
                    console.log(mascota);
                    res.send(mascota);
                })
                .catch(reason => {
                    res.statusCode = 404;
                    res.end();
                })
        })
        .delete(async function (req, res) {
            let delMascota = req.body;
            Mascota.findOneAndDelete({
                    _id: putMascota._id
                })
                .then(mascota => {
                    res.statusCode = 200;
                    res.send(mascota);
                })
                .catch(reason => {
                    res.statusCode = 404;
                    res.end();
                })
        });

module.exports = router;
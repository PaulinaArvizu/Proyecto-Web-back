const express = require('express');
const router = express.Router();
const Posts = require('../db/publicacion');

router.route('/')
    .get((req, res) => {
        Posts.find()
            .then(posts => {
                res.statusCode = 200;
                res.send(posts);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newPost = req.body;
        // Validar si vienen las propiedades
        if(!newPost.descripcion || !newPost.img || !newPost.mascotas || !newPost.fecha || !newPost.username || !newPost.nombreMascotas) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: descripcion, img, mascotas, fecha, username, nombreMascotas.');
        }
        else {
            // No se valida otra cosa
            let postDocument = Publicacion(newPost); //utilizamos el modelo para crear un documento con el nuevo usuario
            postDocument.save() //se guarda en la base de datos
                .then(post => {
                    res.statusCode = 201;
                    res.send(post);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
            }
        })
        .put(async function (req, res) {
            let putPost = req.body;
            Posts.findOneAndReplace({
                    _id: putPost._id
                }, putPost)
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
            let patchPost = req.body;
            Posts.findOneAndUpdate({
                    _id: putPost._id
                }, patchPost)
                .then(post => {
                    res.statusCode = 200;
                    res.send(post);
                })
                .catch(reason => {
                    res.statusCode = 404;
                    res.end();
                })
        })
        .delete(async function (req, res) {
            let delPost = req.body;
            Posts.findOneAndDelete({
                    _id: putPost._id
                })
                .then(post => {
                    res.statusCode = 200;
                    res.send(post);
                })
                .catch(reason => {
                    res.statusCode = 404;
                    res.end();
                })
        });

module.exports = router;
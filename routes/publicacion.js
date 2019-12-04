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
        });

module.exports = router;
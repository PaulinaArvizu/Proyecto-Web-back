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
        if(!newProduct.nombre || !newProduct.precio || !newProduct.marca || !newProduct.size || !newProduct.detalles || !newProduct.fecha || !newProduct.img) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre del producto, precio, marca, tamaño, detalles, fecha y el link a la imagen');
        }
        else {
            // Validar si existe un producto con el mismo nombre
             //con await, el codigo se espera hasta que reciba la respuesta
            let sameNameProduct = await Product.find({nombre: newProduct.nombre});

           if(sameNameProduct.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un producto con el mismo nombre');
            }
            else {
                let productDocument = Producto(newProduct); //utilizamos el modelo para crear un documento con el nuevo producto
                productDocument.save() //se guarda en la base de datos
                    .then(product => {
                        res.statusCode = 201;
                        res.send(product);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    })
    .put(async function (req, res) {
        let putProduct = req.body;
        Product.findOneAndReplace({
                _id: putProduct._id
            }, putProduct)
            .then(product => {
                res.statusCode = 200;
                res.send(product);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .patch(async function (req, res) {
        let patchProducto = req.body;
        Product.findOneAndUpdate({
                _id: patchProducto._id
            }, patchProducto)
            .then(product => {
                res.statusCode = 200;
                res.send(product);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .delete(async function (req, res) {
        let delProducto = req.body;
        Product.findOneAndDelete({
                _id: delProducto._id
            })
            .then(product => {
                res.statusCode = 200;
                res.send(product);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    });;

module.exports = router;
const express = require('express');
const router = express.Router();
const Pedido = require('../db/pedido');

router.route('/')
    .get((req, res) => {
        Pedido.find()
            .then(pedido => {
                res.statusCode = 200;
                res.send(pedido);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newPedido = req.body;
        // Validar si vienen las propiedades
        if(!newPedido.productos || !newPedido.subtotal || !newPedido.total || !newPedido.status) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: Nombre del producto, precio, marca, tamaño, detalles, fecha y el link a la imagen');
        }
        else {
            // Validar si existe un pedudo con el mismo nombre
             //con await, el codigo se espera hasta que reciba la respuesta
            let sameNameProduct = await Product.find({nombre: newProduct.nombre});

           if(sameNameProduct.length > 0) {
                res.statusCode = 400;
                res.send('Ya existe un producto con el mismo nombre');
            }
            else {
                let pedidoDocument = Pedido(newPedido); //utilizamos el modelo para crear un documento con el nuevo producto
                productDocument.save() //se guarda en la base de datos
                    .then(pedido => {
                        res.statusCode = 201;
                        res.send(pedido);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    })
    .put(async function (req, res) {
        let putPedido = req.body;
        Pedido.findOneAndReplace({
                _id: putPedido._id
            }, putPedido)
            .then(pedido => {
                res.statusCode = 200;
                res.send(pedido);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .patch(async function (req, res) {
        let patchPedido = req.body;
        Pedido.findOneAndUpdate({
                _id: patchPedido._id
            }, patchPedido)
            .then(pedido => {
                res.statusCode = 200;
                res.send(pedido);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    })
    .delete(async function (req, res) {
        let delPedido = req.body;
        Pedido.findOneAndDelete({
                _id: delPedido._id
            })
            .then(pedido => {
                res.statusCode = 200;
                res.send(pedido);
            })
            .catch(reason => {
                res.statusCode = 404;
                res.end();
            })
    });;

module.exports = router;
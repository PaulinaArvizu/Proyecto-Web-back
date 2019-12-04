const express = require('express');
const router = express.Router();
const mPago = require('../db/metodoPago');

router.route('/')
    .get((req, res) => {
        mPago.find()
            .then(mpago => {
                res.statusCode = 200;
                res.send(mpago);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    })
    .post(async function (req, res) {
        let newmPago = req.body;
        // Validar si vienen las propiedades
        if(!newmPago.tarjeta || !newmPago.tipo || !newmPago.categoria || !newmPago.fecha || !newmPago.nombre || !newmPago.apellido || !newmPago.codigo || !newmPago.direccion) {
            res.statusCode = 400;
            res.send('Las propiedades requeridas son: 16 digitos de la tarjeta, tipo y categoria de tarjeta, fecha, nombre y apellido del propietario de la tarjeta, codigo de seguridad y direccion de facturacion de la tarjeta');
        }
        else {
            // Validar si existe un metodo de pago con el mismo nombre
             //con await, el codigo se espera hasta que reciba la respuesta
            let sameTarjetamPago = await mPago.find({tarjeta: newmPago.tarjeta});

           if(sameTarjetamPago.length > 0) {
                res.statusCode = 400;
                res.send('Ya hay una tarjeta con ese nombre');
            }
            else {
                let mPagoDocument = mPago(newmPago); //utilizamos el modelo para crear un documento con el nuevo producto
                mPagoDocument.save() //se guarda en la base de datos
                    .then(mpago => {
                        res.statusCode = 201;
                        res.send(mpago);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        res.end();
                    });
            }
        }
    });

module.exports = router;
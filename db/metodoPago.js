const mongoose = require('./mongodb-connect') //importa el archivo

let metodoPagoSchema = mongoose.Schema({
    tarjeta: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Debito', 'Credito'],
        required: true
    },
    categoria: {
        type: String,
        enum: ['Mastercard', 'Visa', 'American Express'],
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    direccion: {
        type: [String], //arreglo de strings
        required: true
    }
},
{collection: 'MetodosDePago'});

metodoPagoSchema.statics.addMetodoPago = function(metodoPago) {
    console.log(metodoPago);
    let newMetodoPago = User(metodoPago);
    return newMetodoPago.save();
}

let MetodoPago = mongoose.model('metodoPago', metodoPagoSchema);

module.exports = MetodoPago;
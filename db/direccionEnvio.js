const mongoose = require('./mongodb-connect') //importa el archivo

let direccionSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    subDireccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    CP: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
},
{collection: 'DireccionesDeEnvio'});

direccionSchema.statics.addDireccion = function(direccion) {
    console.log(direccion);
    let newDireccion = Direccion(direccion);
    return newDireccion.save();
}

let Direccion = mongoose.model('direccion', direccionSchema);

module.exports = Direccion;
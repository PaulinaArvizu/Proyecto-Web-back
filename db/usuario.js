const mongoose = require('./mongodb-connect') //importa el archivo

let usuarioSchema = mongoose.Schema({
    correo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reportado: {
        type: Boolean,
        required: true
    },
    seguidores: {
        type: [String]
    },
    siguiendo: {
        type: [String]
    },
    admin: {
        type: Boolean,
        required: true
    },
    moderador: {
        type: Boolean,
        required: true
    },
    img: {
        type: String
    }
});

usuarioSchema.statics.addUsuario = function(usuario) {
    console.log(usuario);
    let newUsuario = Usuario(usuario);
    return newUsuario.save();
}

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;
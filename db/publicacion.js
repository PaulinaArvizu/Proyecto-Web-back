const mongoose = require('./mongodb-connect') //importa el archivo

let publicacionSchema = mongoose.Schema({
    descripcion: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    mascotas: {
        type: [String],
        required: true
    },
    reportado: {
        type: Boolean
    },
    fecha: {
        type: Date,
        required: true
    },
    likes: {
        type: [String]
    },
    username: {
        type: String,
        required: true
    },
    nombreMascotas: {
        type: String,
        required: true
    }
});

publicacionSchema.statics.addPublicacion = function(publicacion) {
    console.log(user);
    let newPublicacion = Publicacion(publicacion);
    return newPublicacion.save();
}

let Publicacion = mongoose.model('publicacion', publicacionSchema);

module.exports = Publicacion;
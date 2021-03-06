const mongoose = require('./mongodb-connect') //importa el archivo

let publicacionSchema = mongoose.Schema({
    idU: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    descripcion: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    username: {
        type: String,
        required: true
    },
    nombreMascotas: {
        type: String,
        required: true
    }
},
{collection: 'Publicaciones'});

publicacionSchema.statics.addPublicacion = function(publicacion) {
    console.log(user);
    let newPublicacion = Publicacion(publicacion);
    return newPublicacion.save();
}

let Publicacion = mongoose.model('publicacion', publicacionSchema);

module.exports = Publicacion;
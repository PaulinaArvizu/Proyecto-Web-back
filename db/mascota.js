const mongoose = require('./mongodb-connect') //importa el archivo

let mascotaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['Extra chico', 'Chico', 'Mediano', 'Grande'],
        required: true
    },
    descripcion: {
        type: String
    },
    img: {
        type: String,
        required: true
    }
});

mascotaSchema.statics.addPet = function(pet) {
    console.log(pet);
    let newPet = Mascota(pet);
    return newPet.save();
}

let Mascota = mongoose.model('mascota', mascotaSchema);

module.exports = Mascota;
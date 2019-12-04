const mongoose = require('./mongodb-connect') //importa el archivo

let productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    detalles: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

productoSchema.statics.addProducto = function(producto) {
    console.log(producto);
    let newProducto = Producto(producto);
    return newProducto.save();
}

let Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;
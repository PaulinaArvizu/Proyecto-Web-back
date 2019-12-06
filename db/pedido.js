const mongoose = require('./mongodb-connect') //importa el archivo

let pedidoSchema = mongoose.Schema({
    idU: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    productos: [
        {
            id: {type: mongoose.Schema.Types.ObjectId},
            nombre: {type: String},
            img: {type: String},
            cantidad: {type: Number},
            precio: {type: Number}
        }
    ],
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [1, 2, 3],
        required: true
    }
},
{collection: 'Pedidos'});

pedidoSchema.statics.addPedido = function(pedido) {
    console.log(pedido);
    let newPedido = Pedido(pedido);
    return newPedido.save();
}

let Pedido = mongoose.model('pedido', pedidoSchema);

module.exports = Pedido;
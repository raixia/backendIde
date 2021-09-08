const { Schema, model } = require('mongoose');
const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: Array,
        default: []
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precioVenta: {
        type: Number,
        default: 0.0
    },
    precioCompra: {
        type: Number,
        default: 0.0
    },
    descripcion: {
        type: String,
        default: ''
    }
}, { timestamps: true })
module.exports = model('Producto',productoSchema)






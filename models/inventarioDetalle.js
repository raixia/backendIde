const { Schema, model } = require('mongoose');
const inventarioDetalleSchema = Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    inventario: {
        type: Schema.Types.ObjectId,
        ref: 'Inventario',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    talla: {
        type: String,
        default: 'M'
    },
    color: {
        type: String,
        default: 'Negro'
    },
    stock: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        default: 'Procesado'
    },

}, { timestamps: true })
module.exports = model('InventarioDetalle', inventarioDetalleSchema)
const { Schema, model } = require('mongoose');
const movimientoDetalleSchema = Schema({

    inventarioDetalle:{
        type: Schema.Types.ObjectId,
        ref: 'InventarioDetalle',
        required: true
    },
    cantidad:{
        type:Number,
        default:0.0
    }
}, { timestamps: true })
module.exports = model('Movimiento', movimientoDetalleSchema)
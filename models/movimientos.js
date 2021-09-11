const { Schema, model } = require('mongoose');
const movimientoSchema = Schema({
    inventarioDestino:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    InventarioOrigen:{
        type: Schema.Types.ObjectId,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado:{
        type:String,
        default:'Procesando'
    }

}, { timestamps: true })
module.exports = model('Movimiento', movimientoSchema)
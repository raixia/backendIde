const { Schema, model } = require('mongoose');
const inventarioSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    sede: {
        type: Schema.Types.ObjectId,
        ref: 'Sede',
        required: true
    },
    UsuariosInv: {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
    }
}, { timestamps: true })
module.exports = model('Inventario', inventarioSchema)
const { Schema, model } = require('mongoose');
const SedeSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: Array,
        default: []
    },
    direccion: {
        type: String,
        default: ''
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
})
module.exports = model('Sede', SedeSchema)
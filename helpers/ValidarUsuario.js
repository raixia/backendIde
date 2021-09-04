const Usuario = require("../models/usuarios")


const existeCorreo = async (correo = '') => {
    const existCorreo = await Usuario.findOne({ correo })
    if (existCorreo) {
        throw new Error(`el correo : ${correo} ya esta registrado`)
    }
}

const existeidUsuario = async (id = '') => {
    const existid = await Usuario.findById(id)
    if (!existid) {
        throw new Error(`el id : ${id} no existe`)
    }
}



module.exports = {
    existeCorreo,
    existeidUsuario
}
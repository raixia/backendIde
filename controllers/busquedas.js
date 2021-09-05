const { response, request } = require("express")
const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuarios')
const coleccionesPermitidas = [
    'usuarios',
    'categiria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const mongoID = ObjectId.isValid(termino)
    if (mongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            ok: true,
            result: [
                (usuario) ? [usuario] : []
            ]

        })

    }
    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex/*,estado:true*/ }, { correo: regex }]
    })
    res.json({
        ok:true,
        results: usuarios
    })

}

const busquedascd = (req = request, res = response) => {
    const { termino, coleccion } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: `las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            break;
        case 'productos':
            break;
        default:
            res.status(500).json({
                ok: false,
                msg: 'aun nose realiza esta busqueda'
            })
    }

}
module.exports = {
    busquedascd
}
const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuarios");
const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    console.log(token)
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETJWTKEY)
        const usuario = await Usuario.findById(uid)
        if(!usuario){
            res.status(401).json({
                ok:false,
                msg:'usuario no econtrado-- token no valido'
            })
        }
        if(!usuario.estado){
            return res.status(401).json({
                ok:false,
                msg:'token no valido -- usuario desactivado'
            })
        }
        req.usuario=usuario
        next()
    } catch (error) {
        
      //  console.log(error)
        res.status(401).json({
            ok:false,
            msg: 'token no valido'
        })
    }
}
module.exports = {
    validarJWT
}
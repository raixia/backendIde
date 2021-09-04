const { request, response } = require("express")
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/generarJWT");
const login =async (req = request, res = response) => {
    const { correo,password } = req.body
    const usuarioDB = await Usuario.findOne({ correo })
    if (!usuarioDB) {
        res.status(404).json({
            ok:false,
            msg:`el ${correo} no existe en la base de datos`,
            
        })
    }
    const validPassword=bcryptjs.compareSync(password,usuarioDB.password);
    if(!validPassword){
        return res.status(401).json({
            ok:false,
            msg:'Contraseña no valida !!!!'
        })
    }
    const token = await generarJWT(usuarioDB.id)
    res.json({
        ok:true,
        msg: 'Te logeaste correctamente',
        usuarioDB,
        token
    })
}
const renovarToken=async(req = request, res = response)=>{0
    const id = req.usuario._id
    const usuario= req.usuario
    console.log(id)
    const token = await generarJWT(id)


    res.json({
        ok:true,
        msg:'Estas en el renovar token',
        token,
        usuario
    })
}
module.exports={
    login,
    renovarToken
}
const { response, request } = require("express")
const Usuario = require("../models/usuarios")
const bcryptjs = require('bcryptjs');
const crearUsuario = async (req = request, res = response) => {


    const { nombre, correo, password } = req.body
    const salt = bcryptjs.genSaltSync();
    bcryptjspwd = bcryptjs.hashSync(password, salt);
    data = {
        nombre,
        correo,
        fechaCreacion: new Date(),
        password: bcryptjspwd
    }
    const usuarioDB = new Usuario(data)
    await usuarioDB.save();

    res.json({
        ok: true,
        msg: 'hola estas en el crear usuario',
        usuarioDB
    })
}
const getUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    console.log(req.usuario)
    const estado = { estado: true }
    const usuarioAuth = req.usuario
    const [usuarios, total] = await Promise.all([
        Usuario.find().skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments()
    ])

    if (!usuarios) {
        res.status(403).json({
            ok: false,
            msg: 'hubo un problema con la consulta'
        })
    }
    res.json({
        usuarios,
        total,
        usuarioAuth
    })

}
const getUusuarioxid = async (req = request, res = response) => {
    const id = req.params.id
    const usuariodb = await Usuario.findById(id)
    if (!usuariodb) {
        return res.status(404).json({
            ok: false,
            msg: 'el usuario no existe'
        })
    }
    res.json({
        ok: true,
        msg: 'estas en el obterner usuario por id',
        usuariodb
    })
}
const actualizarUsuario = async (req = request, res = response) => {

    uid = req.params.id
    const usuarioDB = await Usuario.findById(uid)
    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: `no existe el usuario con ese id`
        })
    }

    const { correo, nombre } = req.body
    data = {}
    if (usuarioDB.correo == correo || correo === '' || correo === null || correo === undefined) {
        data = {
            nombre
        }
    } else if (usuarioDB.correo != correo) {
        const existeCorreo = await Usuario.findOne({ correo })
        if (existeCorreo) {
            res.status(402).json({
                ok: false,
                msg: 'el el correo ya existe'
            })
        }
        data = {
            nombre,
            correo
        }
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, data, { new: true })
    res.json({
        ok: true,
        msg: 'usuario se actualizo correctamente',
        usuarioActualizado
    })
    /*const { estado, rol, fechaCreacion, correo, ...campos } = req.body
     if (usuarioDB.correo !== correo) {
         const existecorreo = await Usuario.findOne({ correo })
         if (existecorreo) {
             return res.status(500).json({
                 ok:false,
                 msg: 'ya existe un usuario con ese email'
             })
         }  
         */

    //falta acabar el aparece null en el correo a actualizar //si no se manda el correo sale el error




}
const cambiarRoles=async (req=request,res=response)=>{
    const id=req.params.id
    const rol = req.body.rol
    const usuariodb = await Usuario.findByIdAndUpdate(id,{rol:rol},{new:true})
    if(!usuariodb){
        res.status(404).json({
            ok:false,
            msg:'el usuario no se pudo actualizar o no se pudo encontrar'
        })
    }
    res.json({
       ok:true,
       usuariodb,
       msg:'usuario actualizado' 
    })
}
const estadoUsuario = async (req = request, res = response) => {

    const id = req.params.id
    const { estado } = req.body
    const usuarioAuth = req.usuario
    if (estado === 'false') {
        const usuarioDB = await Usuario.findOneAndUpdate(id, { estado: false }, { new: true })
        res.json({
            ok: true,
            msg: 'usuario Desactivado',
            usuarioDB
        })
    } else if (estado === 'true') {
        const usuarioDB = await Usuario.findOneAndUpdate(id, { estado: true }, { new: true })
        res.json({
            ok: true,
            msg: 'usuario Activado',
            usuarioDB,
            usuarioAuth
        })
    }
    else {
        res.status(403).json({
            ok: false,
            msg: 'el valor no esta permitido'
        })
    }


}

module.exports = {
    crearUsuario,
    getUsuarios,
    actualizarUsuario,
    estadoUsuario,
    getUusuarioxid,
    cambiarRoles
}
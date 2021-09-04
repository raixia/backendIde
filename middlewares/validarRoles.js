const { request, response } = require("express");
const validarAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            ok:false,
            msg: 'se quiere verificar el role sin validar el token primero'
        })
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok:false,
            msg: `el ${nombre} no es administrador no puede realizar esta funcion`
        })
    }
    next()

}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        //console.log(req.usuario)
        if (!req.usuario) {
            return res.status(500).json({
                ok:false,
                msg: 'se quiere verificar el role sin validar el token primero'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                ok:false,
                msg: `el servicio requiere unos de estos roles : ${roles}`
            })
        }
        next()

    }

}
const validarRolesAdmin= (req=request,res=response,next)=>{
    const idparam = req.params.id
    const idusuario=req.usuario._id
    if(idparam==idusuario || req.usuario.rol ==='ADMIN_ROLE'){
        console.log(req.usuario._id)
       next()
    }else{
     //   console.log(req.usuario._id)
 //       console.log(req.params.id)
        return res.status(401).json({
            ok:false,
            msg:'no tienes privilegios para hacer esto ADMIN/USUARIO',
            idparam,
            idusuario
             // solo es para el usuario registrado y el admin otros usuarios no pueden acceder a la informacion
        })
    }

}

module.exports = {
    validarAdminRole,
    tieneRole,
    validarRolesAdmin
}
const { response, request } = require("express")
const Usuario = require("../models/usuarios")

const ImgUsuario = async (req = request, res = response) => {
    const id = req.params.id
    let imagenes = []
    let imgtemp = req.files
    for (let index = 0; index < imgtemp.length; index++) {
        let element = imgtemp[index].path;
        imagenes.push(element)

    }

    const imgUsuarioDB = await Usuario.findByIdAndUpdate(id, { img: imagenes })
    if(!imgUsuarioDB){
        res.status(404).json({
            ok:false,
            msg:'no se pudo subir la imagen / Usuario desconocido',
        })
    }

    console.log(imagenes)
    //  const usuarioDB= await Usuario.findByIdA    dUpdate(id,{img:})
    // console.log(req.files)
    res.json({
        ok:true,
        msg: ' se subio el archivo correctamente',
        imagenes
    })
}
module.exports = {
    ImgUsuario
}
const Crear = async (Modelo, res, resto) => {
    const crear = new Modelo(resto)
    await crear.save()
    res.json({
        ok: true,
        msg: 'Se creo la sede correctamente',
        crear
    })
}
const Actualizar = async (Modelo, res, resto, id) => {
    const actualizar = await Modelo.findByIdAndUpdate(id, resto, { new: true })
    if (!actualizar) {
        res.status(404).json({
            ok: false,
            msg: 'Se el id no se encontro',
         //   ConsultaUpdate
        })
    }
    res.json({
        ok: true,
        msg: 'se guardaron los datos correctamente',
        actualizar
    })
}
const UpdateEstado = async (Modelo, id, res, usuariologin, estado) => {
    //  const productodb = await Producto.findById(id)
    const ActualizarModelo = await Modelo.findById(id)
    let estadoBoolean = true
    if (!ActualizarModelo) {
        res.status(404).json({
            ok: false,
            msg: `el producto con el id ${id} no existe`
        })
    }
    if (estado == "true") {
        estadoBoolean = true
    } else if (estado == "false") {
        estadoBoolean = false
    } else {
        res.status(500).json({
            ok: false,
            msg: 'valor no permitido'
        })
    }
    data = {
        estado: estadoBoolean,
        usuario: usuariologin
    }
    console.log(data)
    const ActualizarEstado = await Modelo.findByIdAndUpdate(id, data, { new: true })
    res.json({
        ok: true,
        msg: `El estado se actualizo Correctamente`,
        ActualizarEstado
    })

}
const Paginar = async (Modelo, res, limite, desde, usuariologin) => {
    const [respuesta, total] = await Promise.all([
        Modelo.find().skip(Number(desde)).limit(Number(limite)),
        Modelo.countDocuments()
    ])

    if (!respuesta) {
        res.status(404).json({
            ok: false,
            msg: 'hubo un problema con la consulta'
        })
    }
    res.json({
        respuesta,
        total,
        usuariologin
    })
}
const MostrarXid = async (Modelo, res, id) => {

    const Modelodb = await Modelo.findById(id)
    if (!Modelodb) {
        return res.status(404).json({
            ok: false,
            msg: `el id :${id} no existe`
        })
    }
    res.json({
        ok: true,
        msg: 'Peticion exitosa',
        Modelodb
    })
}
module.exports = {
    Crear,
    Actualizar,
    UpdateEstado,
    Paginar,
    MostrarXid
}
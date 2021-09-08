const { response, request } = require("express")
const Categoria = require("../models/categorias")

const mostrarCategoria = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const [categoria, total] = await Promise.all([
        Categoria.find().skip(Number(desde)).limit(Number(limite)),
        Categoria.countDocuments()
    ])
    if (!categoria) {
        res.status(404).json({
            ok: false,
            msg: `hubo un problema con la consulta`
        })
    }
    res.json({
        ok: true,
        msg: 'Categorias creadas',
        categoria,
        total
    })

}
const listarCategoria = async (req, res = response) => {
    const categoria = await Categoria.find();
    if (!categoria) {
        res.status(404).json({
            ok: false,
            msg: 'no se pudo encontrar esta peticion'
        })
    }
    res.json({
        ok: true,
        categoria
    })
}
const crearCategoria = async (req = request, res = response) => {
    const user = req.usuario._id
    const { nombre, estado = true } = req.body
    const categoriadb = await Categoria.findOne({ nombre })
    if (categoriadb) {
        res.status(403).json({
            ok: false,
            msg: `la categoria ${nombre} ya existe`
        })
    }
    const data = {
        nombre,
        estado,
        usuario: user
    }
    const categoria = new Categoria(data)
    await categoria.save();
    res.json({
        ok: true,
        msg: 'Se creo la categoria',
        categoria
    })
}
const actualizarCategoria = async (req = request, res = response) => {
    const user = req.usuario._id
    const id = req.params.id
    const nombre = req.body.nombre
    const categoriadb = await Categoria.findById(id)
    if (!categoriadb) {
        res.status(404).json({
            ok: false,
            msg: `la categoria con el id ${id} no existe`
        })
    }
    data = {
        nombre,
        usuario: user
    }
    const updateCategoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
    res.json({
        ok: true,
        msg: `Categoria Actualizada`,
        updateCategoria
    })

}
const estadoCategoria = async (req = request, res = response) => {
    const user = req.usuario._id
    const id = req.params.id
    const { estado } = req.body
    const categoriadb = await Categoria.findById(id)
    let xestado = true
    if (!categoriadb) {
        res.status(404).json({
            ok: false,
            msg: `la categoria con el id ${id} no existe`
        })
    }
    if (estado == "true") {
        xestado = true
    } else if (estado == "false") {
        xestado = false
    } else {
        res.status(500).json({
            ok: false,
            msg: 'valor no permitido'
        })
    }
    data = {
        estado: xestado,
        usuario: user
    }
    console.log(data)
    const updateCategoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
    res.json({
        ok: true,
        msg: `Categoria Actualizada`,
        updateCategoria
    })
}
module.exports = {
    crearCategoria,
    actualizarCategoria,
    estadoCategoria,
    mostrarCategoria,
    listarCategoria
}
const { response, request } = require("express")
const Producto = require("../models/productos")
const Categoria = require('../models/categorias')


const mostrarProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const [producto, total] = await Promise.all([
        Producto.find().skip(Number(desde)).limit(Number(limite)),
        Producto.countDocuments()
    ])
    if (!producto) {
        res.status(404).json({
            ok: false,
            msg: `hubo un problema con la consulta`
        })
    }
    res.json({
        ok: true,
        msg: 'Productos creados',
        producto,
        total
    })

}
const mostarProductoporId = async(req = request, res = response) => {
    const id = req.params.id
    const productodb = await Producto.findById(id)
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: `el poducto con id :${id} no existe`
        })
    }
    res.json({
        ok: true,
        msg: 'producto peticion',
        productodb
    })
}


const crearProducto = async (req = request, res = response) => {
    const { categoria, nombre, img = [], estado = true, precioVenta, precioCompra, descripcion } = req.body
    const data = { usuario: req.usuario._id, categoria, nombre, img, estado, precioVenta, precioCompra, descripcion }
    const producto = new Producto(data)
    await producto.save()
    res.json({
        ok: true,
        msg: 'Se guardo el producto',
        producto
    })
}
const actualizarProducto = async (req = request, res = response) => {
    const id = req.params.id
    const { usuario, categoria, nombre, img = [], estado = true, precioVenta, precioCompra, descripcion } = req.body


    const existeCategoria = await Categoria.findById(categoria)
    if (!existeCategoria) {
        return res.status(404).json({
            ok: false,
            msg: `la categoria con el id : ${categoria} no existe`
        })
    }
    const data = { usuario: req.usuario._id, categoria, nombre, img, estado, precioVenta, precioCompra, descripcion }
    const ProductoDB = await Producto.findByIdAndUpdate(id, data, { new: true })
    if (!ProductoDB) {
        return res.status(404).json({
            ok: false,
            msg: `el producto con id ${id} no existe`
        })

    }
    res.json({
        ok: true,
        msg: 'se guardaron los datos correctamente',
        ProductoDB
    })

}
const estadoProducto = async (req = request, res = response)=>{
    const user = req.usuario._id
    const id = req.params.id
    const { estado } = req.body
    const productodb = await Producto.findById(id)
    let xestado = true
    if (!productodb) {
        res.status(404).json({
            ok: false,
            msg: `el producto con el id ${id} no existe`
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
    const updateProducto = await Producto.findByIdAndUpdate(id, data, { new: true })
    res.json({
        ok: true,
        msg: `Producto Actualizado Actualizada`,
        updateProducto
    })
}

module.exports = {
    crearProducto,
    actualizarProducto,
    mostrarProductos,
    mostarProductoporId,
    estadoProducto
}
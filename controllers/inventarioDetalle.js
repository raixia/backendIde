const { response, request } = require("express")
const { Crear, Actualizar, UpdateEstado, Paginar, MostrarXid } = require("../helpers/crud")
const Modelo = require("../models/inventarioDetalle")
const CrearInventarioDetalle =(req = request, res = response) => {
    const usuariologin = req.usuario._id
    const { estado ,usuario,...resto } = req.body
    resto.usuario=usuariologin
    Crear(Modelo,res,resto) // se recibe el modelo como parametro // se recibe el response como parametro // req.body como parametro
}
const ActualizarInventarioDetalle = (req = request, res = response)=>{
    const usuariologin = req.usuario._id
    const id=req.params.id
    const { estado ,usuario,...resto } = req.body
    resto.usuario=usuariologin
    Actualizar(Modelo,res,resto,id)
}
const actualizarEstadoInvDetalle = (req= request,res=response)=>{
    const usuariologin = req.usuario._id
    const id=req.params.id
    const { estado } = req.body
    UpdateEstado(Modelo,id,res,usuariologin,estado)
}
const MostrarInventarioPagDetalle=(req= request,res=response)=>{
    const { limite = 5, desde = 0 } = req.query
    const usuariologin = req.usuario._id
    Paginar(Modelo,res,limite,desde,usuariologin)
}
const mostrarInventarioIDDetalle=(req= request,res=response)=>{
    const id = req.params.id
    MostrarXid(Modelo,res,id)
}
module.exports = {
    CrearInventarioDetalle,
    ActualizarInventarioDetalle,
    actualizarEstadoInvDetalle,
    MostrarInventarioPagDetalle,
    mostrarInventarioIDDetalle
}
const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarCategoria } = require('../controllers/categoria');
const { crearProducto, mostarProductoporId, actualizarProducto, mostrarProductos, estadoProducto } = require('../controllers/productos');
const { validarJWT, validarAdminRole, tieneRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.get('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'DEV_ROLE'),
    validarCampos],
    mostrarProductos)
router.get('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'DEV_ROLE'),
    validarCampos],
    mostarProductoporId)
router.post('/', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'el nombre no debe estar vacio').not().isEmpty(),
    check('categoria', 'no es un id Valido').isMongoId(),
    check('precioVenta', 'el precio de venta tiene que ser un numero').isNumeric(),
    check('precioCompra', 'el precio de venta tiene que ser un numero').isNumeric(),
    validarCampos],
    crearProducto
)
router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'el nombre no debe estar vacio').not().isEmpty(),
    check('categoria', 'no es un id Valido').isMongoId(),
    check('precioVenta', 'el precio de venta tiene que ser un numero').isNumeric(),
    check('precioCompra', 'el precio de venta tiene que ser un numero').isNumeric(),
    validarCampos],
    actualizarProducto
)
router.put('/estado/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'el id no es valido').isMongoId(),
    check('estado', 'el estado es obligatorio').not().isEmpty(),
    validarCampos
], estadoProducto
)

module.exports = router
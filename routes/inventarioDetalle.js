const { Router } = require('express');
const { check } = require('express-validator');
const { MostrarInventarioPagDetalle, mostrarInventarioIDDetalle, CrearInventarioDetalle, ActualizarInventarioDetalle, actualizarEstadoInvDetalle } = require('../controllers/inventarioDetalle');
const { validarJWT, validarAdminRole, validarCampos } = require('../middlewares');
const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],
    MostrarInventarioPagDetalle
)
router.get('/:id', [
    validarJWT,
    validarCampos
],
    mostrarInventarioIDDetalle
)
router.post('/', [
    validarJWT,
    validarAdminRole,
    check('producto', 'No tiene que estar vacio').not().isEmpty(),
    check('producto', 'La sede es obligatoria').isMongoId(),
    check('inventario', 'No tiene que estar vacio').not().isEmpty(),
    check('inventario', 'La sede no es un id de mongo').isMongoId(),
    validarCampos
],
    CrearInventarioDetalle)
router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('producto', 'No tiene que estar vacio').not().isEmpty(),
    check('producto', 'La sede es obligatoria').isMongoId(),
    check('inventario', 'No tiene que estar vacio').not().isEmpty(),
    check('inventario', 'La sede no es un id de mongo').isMongoId(),
    validarCampos
],
    ActualizarInventarioDetalle)
router.put('/estado/:id', [
    validarJWT,
    validarAdminRole,
    check('estado', 'es estado es obligatorio').not().isEmpty(),
    validarCampos
],
    actualizarEstadoInvDetalle)
module.exports = router
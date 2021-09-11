const { Router } = require('express');
const { check } = require('express-validator');
const { MostrarInventarioPag, mostrarInventarioID, CrearInventario, ActualizarInventario, actualizarEstadoInv } = require('../controllers/inventario');
const { validarJWT, validarAdminRole, validarCampos } = require('../middlewares');
const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],
    MostrarInventarioPag
)
router.get('/:id', [
    validarJWT,
    validarCampos
],
    mostrarInventarioID
)
router.post('/', [
    validarJWT,
    validarAdminRole,
    check('sede', 'La sede es obligatoria').not().isEmpty(),
    check('sede', 'La sede no es un id de mongo').isMongoId(),
    validarCampos
],
    CrearInventario)
router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('sede', 'La sede es obligatoria').not().isEmpty(),
    check('sede', 'La sede no es un id de mongo').isMongoId(),
    validarCampos
],
    ActualizarInventario)
router.put('/estado/:id', [
    validarJWT,
    validarAdminRole,
    check('estado', 'es estado es obligatorio').not().isEmpty(),
    validarCampos
],
    actualizarEstadoInv)
module.exports = router
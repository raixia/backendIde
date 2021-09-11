const { Router } = require('express');
const { check } = require('express-validator');
const { busquedascd } = require('../controllers/busquedas');
const { prueba, ActualizarSede, CrearSede, actualizarEstado, MostrarSedePag, mostrarSedeID } = require('../controllers/sedes');
const { validarJWT, validarAdminRole, validarCampos } = require('../middlewares');
const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],
    MostrarSedePag
)

router.get('/:id', [
    validarJWT,
    validarCampos
],
    mostrarSedeID
)
router.post('/', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'El nombre debe ser obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es ser obligatoria').not().isEmpty(),
    validarCampos
],
    CrearSede)
router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'El nombre debe ser obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es ser obligatoria').not().isEmpty(),
    validarCampos
],
    ActualizarSede)
router.put('/estado/:id', [
    validarJWT,
    validarAdminRole,
    check('estado', 'es estado es obligatorio').not().isEmpty(),
    validarCampos
],
    actualizarEstado)

module.exports = router
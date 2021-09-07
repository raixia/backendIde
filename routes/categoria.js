const { Router } = require('express');
const { check } = require('express-validator');
const { login, renovarToken } = require('../controllers/auth');
const { crearCategoria, actualizarCategoria, estadoCategoria, mostrarCategoria } = require('../controllers/categoria');
const { existeCorreo, NoexisteCorreo } = require('../helpers/ValidarUsuario');
const { validarJWT, validarAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();



router.get('/', [
   /* validarJWT,
    validarAdminRole,
    validarCampos */
],
    mostrarCategoria
)

router.post('/', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
],
    crearCategoria
)
router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'el id no es valido').isMongoId(),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria
)
router.put('/estado/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'el id no es valido').isMongoId(),
    check('estado', 'el estado es obligatorio').not().isEmpty(),
    validarCampos
], estadoCategoria
)

module.exports = router
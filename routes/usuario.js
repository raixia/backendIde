const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, getUsuarios, actualizarUsuario, DesactivarUsuario, estadoUsuario, getUusuarioxid, cambiarRoles } = require('../controllers/usuarios');
const { existeCorreo, existeidUsuario } = require('../helpers/ValidarUsuario');
const { validarCampos, validarJWT, tieneRole, validarRolesAdmin, validarAdminRole } = require('../middlewares')
const router = Router();
router.get('/', [

    validarJWT,
    validarAdminRole,
    validarCampos
],
    getUsuarios)
/*router.get('/:id', [
    validarJWT,
    validarRolesAdmin,
    check('id','El id no es valido').isMongoId(),
    validarCampos
],
getUusuarioxid
)*/
router.post('/', [
    check('nombre', 'el nombre no puede estar vacio').not().isEmpty(),
    check('correo').custom(existeCorreo),
    validarCampos
],
    crearUsuario
)

router.put('/:id', [

    validarJWT,
    validarRolesAdmin,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('nombre', 'el nombre no puede estar vacio').not().isEmpty(),
    check('correo', 'el correo debe ser valido').isEmail(),
    //  check('correo').custom(existeCorreo),
    validarCampos
],
    actualizarUsuario
)
router.put('/roles/:id',[
    validarJWT,
    validarRolesAdmin,
    validarCampos
],
cambiarRoles
)
router.put('/desactivar/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeidUsuario),
    validarCampos
], estadoUsuario)

module.exports = router
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renovarToken } = require('../controllers/auth');
const { existeCorreo, NoexisteCorreo } = require('../helpers/ValidarUsuario');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/', [
    check('correo', 'el correo debe ser valido').isEmail(),
    check('password', 'La contraseña no debe estar vacia').not().isEmpty(),

    validarCampos
],
    login
)
router.get('/renovarToken', [
    validarJWT
],
    renovarToken
)
module.exports = router
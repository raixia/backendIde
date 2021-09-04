const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  tieneRole  = require('../middlewares/validarRoles');
module.exports={
    ...validarCampos,
    ...validarJWT,
    ...tieneRole
}
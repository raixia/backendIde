const {Router} = require('express');
const { busquedascd } = require('../controllers/busquedas');
const { validarJWT, validarAdminRole, validarCampos } = require('../middlewares');
const router = Router();

router.get('/:coleccion/:termino' , [
    validarJWT,
    validarAdminRole,
    validarCampos
],
busquedascd
)


router.get('/another-route' , (req , res)=>{
    // router code here
})

module.exports  = router
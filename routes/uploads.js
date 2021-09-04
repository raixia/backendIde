const { Router } = require('express');
const { check } = require('express-validator');
const { ImgUsuario } = require('../controllers/uploads');
const { existeidUsuario } = require('../helpers/ValidarUsuario');
const { upload } = require('../middlewares/uploadCloudinary');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.get('/', (req, res) => {
    console.log('esto es el get')
})
router.get('/:id', (req, res) => {
    // rocheck('nombre', 'el nombre no puede estar vacio').not().isEmpty(),

})
router.put('/:id', [
    check('id', 'El id no es un id de mongo').isMongoId(),
    check('id').custom(existeidUsuario),
    upload,
    validarCampos
],
    ImgUsuario
)

module.exports = router
const {Router} = require('express');
const { busquedascd } = require('../controllers/busquedas');
const router = Router();

router.get('/:coleccion/:termino' , [],
busquedascd
)


router.get('/another-route' , (req , res)=>{
    // router code here
})

module.exports  = router
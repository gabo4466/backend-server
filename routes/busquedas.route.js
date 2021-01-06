/*
    Ruta: /api/todo
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getTodo
} = require('../controllers/busquedas.controller');


const router = Router();

// Traer lista de la busqueda
router.get( '/:busqueda', validarJWT ,getTodo);



module.exports = router;
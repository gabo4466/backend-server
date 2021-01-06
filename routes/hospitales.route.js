/*
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales.controller');


const router = Router();

// Traer lista de Hospitales
router.get( '/', getHospitales);

// Crear Hospital
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del Hospital es obligatorio').not().isEmpty(),
        validarCampos
    ], crearHospital
);

// Actualizar Hospital
router.put( '/:id',
    [], 
    actualizarHospital
);

// Eliminar Hospital
router.delete( '/:id', borrarHospital);

module.exports = router;
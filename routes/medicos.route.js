/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controller');


const router = Router();

// Traer lista de Medicos
router.get( '/', getMedicos);

// Crear Medico
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ], crearMedico
);

// Actualizar Medico
router.put( '/:id',
    [], 
    actualizarMedico
);

// Eliminar Medico
router.delete( '/:id', borrarMedico);

module.exports = router;
/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Traer lista de usuarios
router.get( '/', validarJWT, getUsuarios);

// Crear Usuario
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], crearUsuario
);

// Actualizar Usuario
router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario
);

// Eliminar Usuario
router.delete( '/:id', validarJWT, borrarUsuario);

module.exports = router;
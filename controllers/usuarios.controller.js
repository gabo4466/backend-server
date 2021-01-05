const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const getUsuarios = async(req, response) => {
    
    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    response.json({
        ok: true,
        usuarios
    })
};

const crearUsuario = async(req, res = response) => {

    const { nombre, email, password } = req.body;

    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    try {

        const existeEmail = await Usuario.findOne({ email });
        
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        await usuario.save();
        response.json({
            ok: true,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
    
};

module.exports = {
    getUsuarios,
    crearUsuario
}
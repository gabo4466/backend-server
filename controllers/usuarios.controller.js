const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    // Trae una lista de usuarios de 5 en 5
    // Desde parametro d
    const d = Number(req.query.d) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google')
        .skip(d)
        .limit(5),
        Usuario.count()
    ]);

    res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    })
};

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Confirmar si existe el email en la base de datos
        const existeEmail = await Usuario.findOne({ email });
        
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar en la bd y responder la peticion
        await usuario.save();

        // Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
    
};

const actualizarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;

    try {
        // TODO: Validar token y comprobar si es el usuario correcto
        const usuarioDB = await Usuario.findById(uid);
        
        // Verificacion del Id del usuario
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, google, email, ...campos} =  req.body;

        // Verificacion del email
        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne( {email} );
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado'
                });
            }
        }
        
        // Actualizacion
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        
        // Verificacion del Id del usuario
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }



};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
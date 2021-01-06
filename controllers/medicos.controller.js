const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getMedicos = async(req, res = response) => {
    try {
        const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');
        
        res.json({
            ok: true,
            medicos
        })  
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const crearMedico = async(req, res = response) => {
    
    const uid = req.uid;
    const hid = req.body.hospital;
    const medico =  new Medico( {
        usuario: uid,
        ...req.body
    } );
    
    // Comprobar que existe un hospital por ese id
    const existeHospital = await Hospital.findById(hid);
    
    if(!existeHospital) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe un hospital por ese id'
        });
    }
    
    try {

        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            hospital: medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
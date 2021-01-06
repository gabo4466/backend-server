const { response } = require('express');


const getTodo = async (req, res = response) => {

    const palabraClave = req.params.busqueda;
    console.log(palabraClave);

    res.json({
        ok: true,
        palabraClave
    })

};

module.exports = {
    getTodo
}
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creacion de servidor
const app = express();

// Configurar CORS
app.use( cors() );

// Estableciendo conexion a la base de datos
dbConnection();

// Rutas
app.get( '/', (request, response) => {
    response.json({
        ok: true,
        msg: 'hola mundo'
    })
} );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT)
} );




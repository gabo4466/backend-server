const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creacion de servidor
const app = express();

// Configurar CORS
app.use( cors() );

//Lectura y paseo del body
app.use( express.json() );

// Estableciendo conexion a la base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/busquedas.route'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT)
} );




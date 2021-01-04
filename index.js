
const express = require('express');

//Creacion de servidor
const app = express();

//Rutas
app.get( '/', (request, response) => {
    response.json({
        ok: true,
        msg: 'hola mundo'
    })
} );

app.listen( 3000, () => {
    console.log('Servidor corriendo en el puerto '+ 3000)
} );




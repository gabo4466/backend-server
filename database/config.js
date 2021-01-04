//Importacion del paquete mongoose
const mongoose = require('mongoose');
//Conexion a la base de datos
const dbConnection = async () => {

    try {
        await mongoose.connect(
        process.env.DB_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database Online');
    } catch (error) {
        console.log(error);
        throw new Error("Can't connect to the database");
    }

}

module.exports = {
    dbConnection
}
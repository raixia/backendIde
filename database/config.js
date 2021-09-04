const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Se conecto a base de datos correctamente')
    } catch (error) {
        console.log(error)
        throw new Error('error a la hora de conectar a la base de datos')
    }

}
module.exports={
    dbConnection
}
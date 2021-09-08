const express = require('express')
const cors=require('cors');
const { dbConnection } = require('../database/config');
class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT
        this.paths={
            usuarios:'/api/usuario',
            uploads:'/api/uploads',
            auth:'/api/auth',
            buscar:'/api/buscar',
            categoria:'/api/categoria',
            producto:'/api/producto'
        }
        this.conectaDB();
        this.middlewares();
        this.routes();
    }
    async conectaDB(){
        await dbConnection()
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.paths.usuarios,require('../routes/usuario')),
        this.app.use(this.paths.uploads,require('../routes/uploads')),
        this.app.use(this.paths.auth,require('../routes/auth')),
        this.app.use(this.paths.buscar,require('../routes/busquedas')),
        this.app.use(this.paths.categoria,require('../routes/categoria')),
        this.app.use(this.paths.producto,require('../routes/producto'))
    }
    listen(){
        this.app.listen(this.port,()=>console.log('servidor corriendo en el puerto : '+this.port))
    }

}
module.exports={
    Server
}
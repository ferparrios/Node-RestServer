const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const app = express()

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // COnectar a Base de datos
    this.conectarDB();

    // Middlewares -> funcion que siempre se ejecuta cuando se levanta el servidor
    this.middlewares();
    
    // Rutas de la app
    this.routes();
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares(){
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use( express.static('public') );
  }

  routes(){
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puero', this.port)
    })
  }
}

module.exports = Server
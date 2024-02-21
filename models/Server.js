const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || process.env.LOCAL_PORT; // Importando el puerto desde las VARIABLES de ENTORNO

    // El orden de importacion es IMPORTANTE!
    this.connectionDB();
    this.middleware();
    this.routes();
  }

  // Conexion a la base de datos
  async connectionDB() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  // Rutas de la aplicacion
  routes() {
    this.app.use("/user", require("../routes/userRoute"));
    this.app.use("/categorie", require("../routes/categorieRoute"));
    this.app.use("/rol", require("../routes/rolRoute"));
    this.app.use("/auth", require("../routes/authRoute"));
  }

  // Funcion para iniciar el SERVIDOR!
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server to in: ", this.port);
    });
  }
}

module.exports = Server;

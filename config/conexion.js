let conectar = require("mysql");
let conexion = conectar.createConnection({
  host: "localhost",
  database: "basedatosprovecol",
  user: "root",
  password: "",
});

conexion.connect(function (error) {
  if (error) {
    console.log("Error de conexion: " + error);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});

module.exports = conexion;
// Exportar la conexión para usarla en otros archivos

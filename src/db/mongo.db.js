const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL, MONGO_DB_NAME } = process.env;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: MONGO_DB_NAME,
    });
    console.log("Conexion exitosa a Mongo");
  } catch (error) {
    console.error("Error en la conexión a Mongo", error.message);
  }
}

module.exports = { mongoose, connectToDatabase };

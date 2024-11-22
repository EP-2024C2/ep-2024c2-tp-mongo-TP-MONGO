const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
    console.log('Conexión a MongoDB con éxito!');
  } catch (error) {
    console.error('Error en la conexión a MongoDB.', error.message);
  }
}

module.exports = { connectToDatabase, mongoose };
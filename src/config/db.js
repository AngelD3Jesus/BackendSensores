// src/config/db.js o simplemente db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Carga variables del archivo .env

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/alertas_iot';
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Conectado a MongoDB: ${uri.includes('localhost') ? 'local' : 'Railway'}`);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

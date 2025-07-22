const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  sensor: String,
  valor: Number,
  mensaje: String,
  dispositivo: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alerta', alertaSchema);

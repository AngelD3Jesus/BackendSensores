const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 0 },
  descripcion: { type: String },
  imagen: { type: String }, // Enlace de la imagen
}, { timestamps: true });

const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;

import mongoose from 'mongoose';

const inventarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0,
  },
  descripcion: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Inventario = mongoose.model('Inventario', inventarioSchema);

export default Inventario;
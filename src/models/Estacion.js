const mongoose = require('mongoose');

const EstacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  descripcion: String,
  tipo: { type: String, enum: ['CENTRAL', 'SUBESTACION'], required: true },
  estado: { type: String, enum: ['activa', 'inactiva'], default: 'activa' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estacion', EstacionSchema); 
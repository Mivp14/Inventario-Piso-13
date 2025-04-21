const mongoose = require('mongoose');

const bodegaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  estacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estacion',
    required: true
  },
  racks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rack'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Bodega', bodegaSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'El precio debe ser un número entero en pesos chilenos (CLP)'
    }
  },
  categoria: {
    type: String,
    required: true
  },
  rack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rack',
    required: true
  },
  bodega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bodega',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 
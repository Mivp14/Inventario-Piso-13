const mongoose = require('mongoose');

const rackSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  ubicacion: {
    type: String,
    trim: true
  },
  categorias: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'El rack debe tener al menos una categoría'
    }
  },
  bodega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bodega',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rack', rackSchema);

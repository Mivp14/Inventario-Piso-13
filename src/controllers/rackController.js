const Rack = require('../models/Rack');

// Obtener todos los racks
exports.getRacks = async (req, res) => {
  try {
    const racks = await Rack.find();
    res.json(racks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un rack por ID
exports.getRackById = async (req, res) => {
  try {
    const rack = await Rack.findById(req.params.id);
    if (!rack) {
      return res.status(404).json({ message: 'Rack no encontrado' });
    }
    res.json(rack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo rack
exports.createRack = async (req, res) => {
  const rack = new Rack(req.body);
  try {
    const newRack = await rack.save();
    res.status(201).json(newRack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un rack
exports.updateRack = async (req, res) => {
  try {
    const rack = await Rack.findById(req.params.id);
    if (!rack) {
      return res.status(404).json({ message: 'Rack no encontrado' });
    }
    
    Object.assign(rack, req.body);
    const updatedRack = await rack.save();
    res.json(updatedRack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un rack
exports.deleteRack = async (req, res) => {
  try {
    const rack = await Rack.findById(req.params.id);
    if (!rack) {
      return res.status(404).json({ message: 'Rack no encontrado' });
    }
    
    await rack.deleteOne();
    res.json({ message: 'Rack eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
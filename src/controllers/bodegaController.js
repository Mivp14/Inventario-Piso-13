const Bodega = require('../models/Bodega');

// Obtener todas las bodegas
exports.getBodegas = async (req, res) => {
  try {
    const bodegas = await Bodega.find();
    res.json(bodegas);
  } catch (error) {
    console.error('Error al obtener bodegas:', error);
    res.status(500).json({ message: 'Error al obtener bodegas' });
  }
};

// Obtener una bodega por ID
exports.getBodegaById = async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.id);
    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada' });
    }
    res.json(bodega);
  } catch (error) {
    console.error('Error al obtener la bodega:', error);
    res.status(500).json({ message: 'Error al obtener la bodega' });
  }
};

// Crear una nueva bodega
exports.createBodega = async (req, res) => {
  try {
    const nuevaBodega = new Bodega(req.body);
    const bodegaGuardada = await nuevaBodega.save();
    res.status(201).json(bodegaGuardada);
  } catch (error) {
    console.error('Error al crear bodega:', error);
    res.status(500).json({ message: 'Error al crear la bodega' });
  }
};

// Actualizar una bodega
exports.updateBodega = async (req, res) => {
  try {
    const bodegaActualizada = await Bodega.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bodegaActualizada) {
      return res.status(404).json({ message: 'Bodega no encontrada' });
    }
    res.json(bodegaActualizada);
  } catch (error) {
    console.error('Error al actualizar la bodega:', error);
    res.status(500).json({ message: 'Error al actualizar la bodega' });
  }
};

// Eliminar una bodega
exports.deleteBodega = async (req, res) => {
  try {
    const bodegaEliminada = await Bodega.findByIdAndDelete(req.params.id);
    if (!bodegaEliminada) {
      return res.status(404).json({ message: 'Bodega no encontrada' });
    }
    res.json({ message: 'Bodega eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la bodega:', error);
    res.status(500).json({ message: 'Error al eliminar la bodega' });
  }
};

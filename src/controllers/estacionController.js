const Estacion = require('../models/Estacion');

exports.getEstaciones = async (req, res) => {
  try {
    const estaciones = await Estacion.find();
    res.json(estaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las estaciones' });
  }
};

exports.createEstacion = async (req, res) => {
  try {
    const estacion = new Estacion(req.body);
    await estacion.save();
    res.status(201).json(estacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la estación' });
  }
};

exports.updateEstacion = async (req, res) => {
  try {
    const estacion = await Estacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!estacion) return res.status(404).json({ message: 'Estación no encontrada' });
    res.json(estacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la estación' });
  }
};

exports.deleteEstacion = async (req, res) => {
  try {
    const estacion = await Estacion.findByIdAndDelete(req.params.id);
    if (!estacion) return res.status(404).json({ message: 'Estación no encontrada' });
    res.json({ message: 'Estación eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la estación' });
  }
}; 
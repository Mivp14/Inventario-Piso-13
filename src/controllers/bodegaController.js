const Bodega = require('../models/Bodega');
const Estacion = require('../models/Estacion');

// Obtener todas las bodegas
exports.getBodegas = async (req, res) => {
  try {
    const bodegas = await Bodega.find()
      .populate('estacion', 'nombre ubicacion')
      .select('nombre descripcion estacion racks')
      .lean();
    res.json(bodegas);
  } catch (error) {
    console.error('Error al obtener las bodegas:', error);
    res.status(500).json({ message: 'Error al obtener las bodegas' });
  }
};

// Obtener una bodega por ID
exports.getBodegaById = async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.id)
      .populate('estacion', 'nombre ubicacion')
      .select('nombre descripcion estacion racks')
      .lean();
    
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
    const { nombre, descripcion, estacion } = req.body;

    // Verificar que la estación existe
    const estacionExiste = await Estacion.findById(estacion);
    if (!estacionExiste) {
      return res.status(404).json({ message: 'La estación especificada no existe' });
    }

    const bodega = new Bodega({
      nombre,
      descripcion,
      estacion,
      racks: []
    });

    await bodega.save();
    
    // Poblar la estación antes de enviar la respuesta
    const bodegaPoblada = await Bodega.findById(bodega._id)
      .populate('estacion', 'nombre ubicacion')
      .select('nombre descripcion estacion racks')
      .lean();
      
    res.status(201).json(bodegaPoblada);
  } catch (error) {
    console.error('Error al crear la bodega:', error);
    res.status(400).json({ message: 'Error al crear la bodega' });
  }
};

// Actualizar una bodega
exports.updateBodega = async (req, res) => {
  try {
    const { nombre, descripcion, estacion } = req.body;

    // Verificar que la estación existe si se está actualizando
    if (estacion) {
      const estacionExiste = await Estacion.findById(estacion);
      if (!estacionExiste) {
        return res.status(404).json({ message: 'La estación especificada no existe' });
      }
    }

    const bodega = await Bodega.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, estacion },
      { new: true }
    )
    .populate('estacion', 'nombre ubicacion')
    .select('nombre descripcion estacion racks')
    .lean();

    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada' });
    }
    
    res.json(bodega);
  } catch (error) {
    console.error('Error al actualizar la bodega:', error);
    res.status(400).json({ message: 'Error al actualizar la bodega' });
  }
};

// Eliminar una bodega
exports.deleteBodega = async (req, res) => {
  try {
    const bodega = await Bodega.findByIdAndDelete(req.params.id);
    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada' });
    }
    res.json({ message: 'Bodega eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la bodega:', error);
    res.status(500).json({ message: 'Error al eliminar la bodega' });
  }
};

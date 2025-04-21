require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');
const rackRoutes = require('./routes/rackRoutes');
const bodegaRoutes = require('./routes/bodegaRoutes');
const estacionRoutes = require('./routes/estacionRoutes');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: ['https://piso13-front.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/racks', rackRoutes);
app.use('/api/bodegas', bodegaRoutes);
app.use('/api/estaciones', estacionRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error.message);
  });

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

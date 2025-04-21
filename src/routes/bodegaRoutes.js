const express = require('express');
const router = express.Router();
const bodegaController = require('../controllers/bodegaController');

// Rutas para bodegas
router.get('/', bodegaController.getBodegas);
router.get('/:id', bodegaController.getBodegaById);
router.post('/', bodegaController.createBodega);
router.put('/:id', bodegaController.updateBodega);
router.delete('/:id', bodegaController.deleteBodega);

module.exports = router;

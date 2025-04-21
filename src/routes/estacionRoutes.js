const express = require('express');
const router = express.Router();
const estacionController = require('../controllers/estacionController');

router.get('/', estacionController.getEstaciones);
router.post('/', estacionController.createEstacion);
router.put('/:id', estacionController.updateEstacion);
router.delete('/:id', estacionController.deleteEstacion);

module.exports = router; 
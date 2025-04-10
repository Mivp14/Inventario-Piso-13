const express = require('express');
const router = express.Router();
const rackController = require('../controllers/rackController');

// Rutas para racks
router.get('/', rackController.getRacks);
router.get('/:id', rackController.getRackById);
router.post('/', rackController.createRack);
router.put('/:id', rackController.updateRack);
router.delete('/:id', rackController.deleteRack);

module.exports = router; 
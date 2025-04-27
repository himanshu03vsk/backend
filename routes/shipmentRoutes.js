const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware, shipmentController.getAllShipments);
router.get('/:id',authMiddleware, shipmentController.getShipmentById);
router.post('/',authMiddleware, shipmentController.createShipment);
router.put('/:id',authMiddleware, shipmentController.updateShipment);
router.delete('/:id',authMiddleware, shipmentController.deleteShipment);

module.exports = router;

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/', authMiddleware, carController.getAllCars);
router.get('/:make/:model/:year', authMiddleware, carController.getCarById);
router.post('/', authMiddleware, carController.createCar);
router.put('/:make/:model/:year', authMiddleware, carController.updateCar);
router.delete('/:make/:model/:year', authMiddleware , carController.deleteCar);

module.exports = router;

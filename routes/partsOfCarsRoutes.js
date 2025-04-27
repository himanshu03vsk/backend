const express = require('express');
const router = express.Router();
const partsOfCarsController = require('../controllers/partsOfCarsController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/search', partsOfCarsController.searchParts);
router.get('/category', partsOfCarsController.getMakeModelYear);

router.get('/', authMiddleware, partsOfCarsController.getAllPartsOfCars);
router.get('/:part_id/:make/:model/:car_year',authMiddleware, partsOfCarsController.getPartsOfCarsById);
router.post('/', partsOfCarsController.createPartsOfCars);
router.put('/:part_id/:make/:model/:car_year',authMiddleware, partsOfCarsController.updatePartsOfCars);
router.delete('/:part_id/:make/:model/:car_year',authMiddleware, partsOfCarsController.deletePartsOfCars);

module.exports = router;

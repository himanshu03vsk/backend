const express = require('express');
const router = express.Router();
const partImageController = require('../controllers/partImageController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware,  partImageController.getAllPartImages);
router.get('/:path/:part_id',authMiddleware, partImageController.getPartImageById);
router.post('/',authMiddleware, partImageController.createPartImage);
router.put('/:path/:part_id',authMiddleware, partImageController.updatePartImage);
router.delete('/:path/:part_id',authMiddleware, partImageController.deletePartImage);

module.exports = router;

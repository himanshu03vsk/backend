const express = require('express');
const router = express.Router();
const buyerAddressController = require('../controllers/buyerAddressController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware


router.get('/:buyer_email', buyerAddressController.getBuyerAddressByEmail);
router.post('/create', authMiddleware, buyerAddressController.createBuyerAddress);
// router.get('/', authMiddleware, buyerAddressController.getAllBuyerAddresses);
// router.post('/', authMiddleware, buyerAddressController.createBuyerAddress);
// router.put('/:buyer_email/:line1', authMiddleware, buyerAddressController.updateBuyerAddress);
// router.delete('/:buyer_email/:line1', authMiddleware, buyerAddressController.deleteBuyerAddress);
// router.get('/buyer/:buyer_email', authMiddleware, buyerAddressController.getBuyerAddressByBuyerId);

module.exports = router;

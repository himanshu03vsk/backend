const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/updateCartItem/:buyer_email/:part_id/:color', authMiddleware, cartController.updateCartItem);
router.delete('/clear/:buyer_email', authMiddleware, cartController.clearCart);
router.get('/:buyer_email', authMiddleware, cartController.getCartById);
router.put('/:buyer_email', authMiddleware, cartController.addToCart);

module.exports = router;

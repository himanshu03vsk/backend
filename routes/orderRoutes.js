const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.post('/', authMiddleware, orderController.createOrder);
router.get('/:buyer_email', authMiddleware, orderController.getOrderByEmail);
// router.get('/', authMiddleware, orderController.getAllOrders);
// router.get('/:order_id', authMiddleware, orderController.getOrderById);
// router.put('/:order_id', authMiddleware, orderController.updateOrder);


module.exports = router;

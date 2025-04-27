// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Orders


// GET /api/chat/:userEmail
router.get('/chat/get-users', adminController.getUsersWhoMessagedAdmin);
router.get('/chat/:email', adminController.getMessagesByUser);
// router.get('/chat-messages/:userEmail', adminController.getChatMessagesByUserEmail);


// router.get('/chat/:userEmail', adminController.getChatMessageByUserEmail);
router.get('/orders/:id', adminController.getOrderById);
router.get('/orders', adminController.getAllOrders);

// Shipments
router.get('/shipments/order/:orderId', adminController.getShipmentsByOrder);
router.put('/shipments/:shipmentId/status', adminController.updateShipmentStatus);

module.exports = router;

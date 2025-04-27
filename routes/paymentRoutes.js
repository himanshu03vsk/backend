const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.post('/create', authMiddleware, paymentController.createPayment); // Example route for creating a payment
router.delete('/delete/:method_no', authMiddleware, paymentController.deletePayment); // Example route for deleting a payment
router.get('/:buyer_email',authMiddleware, paymentController.getPaymentByEmail);
router.get('/',authMiddleware, paymentController.getAllPayments);
// router.get('/:method_no/:buyer_email',authMiddleware, paymentController.getPaymentById);

router.post('/',authMiddleware, paymentController.createPayment);
router.put('/:method_no/:buyer_email',authMiddleware, paymentController.updatePayment);
router.delete('/:method_no/:buyer_email',authMiddleware, paymentController.deletePayment);


module.exports = router;

const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware



router.post('/updatePreferences/:buyer_email', authMiddleware, buyerController.updateBuyerNotificationPreferences);
router.get('/getPreferences/:buyer_email', authMiddleware, buyerController.getBuyerNotificationPreferences);


module.exports = router;
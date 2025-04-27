const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/getUserDetails/:buyer_email', authController.getUserDetails);
router.put('/updateUserDetails/:buyer_email', authController.updateUserDetails);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/update', authController.resetPassword);


module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware, userController.getAllUsers);
router.get('/:email',authMiddleware, userController.getUserById);
router.post('/',authMiddleware, userController.createUser);
router.put('/:email',authMiddleware, userController.updateUser);
router.delete('/:email',authMiddleware, userController.deleteUser);

module.exports = router;

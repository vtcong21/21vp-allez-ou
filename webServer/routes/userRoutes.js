const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getUserInfo', authMiddleware.authenticateToken, userController.getUserInfo);
router.get('/getUserPaymentHistory', authMiddleware.authenticateToken, userController.getUserPaymentHistory);

module.exports = router;

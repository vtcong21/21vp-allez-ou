const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/getUserInfo', authMiddleware.authenticateToken, userController.getUserInfo);
module.exports = router;

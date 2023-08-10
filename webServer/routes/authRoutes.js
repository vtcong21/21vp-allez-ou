const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.get('/register', authController.renderRegisterPage);
router.post('/login', authController.login);
router.get('/resendVerificationCode', authController.resendVerificationCode);
router.post('/verify', authController.verify);
router.get('/logout', authController.logout);
module.exports = router;

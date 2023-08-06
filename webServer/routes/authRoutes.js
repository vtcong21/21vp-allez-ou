const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.get('/register', authController.renderRegisterPage);
router.get('/login', authController.renderLoginPage);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.get('/logout', authController.logout);
module.exports = router;

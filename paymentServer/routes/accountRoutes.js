const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/createPaymentAccount', accountController.createAccount);
router.get('/getPaymentHistory', accountController.getPaymentHistory);
router.get('/getTodayPaymentHistory', accountController.getTodayPaymentHistory);
router.post('/sendOTP', accountController.sendOTP);
router.post('/sendMoney', authMiddleware.verifyOTP, accountController.sendMoney);

module.exports = router;
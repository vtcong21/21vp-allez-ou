const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/sendMoney', accountController.sendMoney);
router.post('/createPaymentAccount', accountController.createAccount);
router.get('/getPaymentHistory', accountController.getPaymentHistory);
router.get('/getTodayPaymentHistory', accountController.getTodayPaymentHistory);


module.exports = router;

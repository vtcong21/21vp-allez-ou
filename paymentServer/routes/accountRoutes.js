const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/sendMoney', accountController.sendMoney);
router.get('/getPaymentHistory', accountController.getPaymentHistory);


module.exports = router;

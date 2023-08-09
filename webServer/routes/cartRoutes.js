const express = require('express');
const router = express.Router();

// Import các controller tương ứng
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const transactionController = require('../controllers/transactionController');

router.get('/cart', cartController.getCartPage);
router.get('/order', cartController.getOrderPage);
router.get('/transaction', cartController.getTransactionPage);


module.exports = router;

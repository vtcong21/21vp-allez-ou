const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCartPage);
router.post('/addItem', cartController.addNewItem);
router.delete('/deleteItem', cartController.deleteItem);

router.get('/history', cartController.getOrderPage);
// router.get('/transaction', cartController.getTransactionPage);


module.exports = router;

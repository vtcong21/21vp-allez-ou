const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const convertUserDataMiddleware = require('../middlewares/convertUserDataMiddleware');

router.get('/'
    , authMiddleware.authenticateToken
    , convertUserDataMiddleware.getUserData
    , cartController.getCartPage
);
router.post('/addItem'    
    , authMiddleware.authenticateToken
    , cartController.addNewItem
);
router.delete('/deleteItem'
    , authMiddleware.authenticateToken
    , cartController.deleteItem
);
// cập nhật item ở trang đơn đăng ký tour

router.get('/orderHistory'
    , authMiddleware.authenticateToken
    , convertUserDataMiddleware.getUserData
    , cartController.getOrderHistoryPage
);
router.put('/orderHistory/:itemId'
    , authMiddleware.authenticateToken
    , cartController.cancelOrder
);

router.get('/paymentHistory'
    , authMiddleware.authenticateToken
    , convertUserDataMiddleware.getUserData
    , cartController.getPaymentHistoryPage
);

module.exports = router;

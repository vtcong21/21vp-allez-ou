const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// render trang dashboard
router.get('/'
    , authMiddleware.requireAdminRole
    , adminController.renderDashboardPage);
// render trang order
router.get('/orders'
    , authMiddleware.requireAdminRole
    , adminController.renderOrderPage);
// render trang tours
router.get('/tours'
    , authMiddleware.requireAdminRole
    , adminController.renderTourPage);
// render trang client
router.get('/client'
    , authMiddleware.requireAdminRole
    , adminController.renderClientPage);
// render trang adminRole
router.get('/admin-role'
    , authMiddleware.requireAdminRole
    , adminController.renderAdminRolePage);
// trả mảng client
router.get('/getClientList'
    , authMiddleware.requireAdminRole
    , adminController.getClientList);
// trả manrg admin
router.get('/getAdminList'
    , authMiddleware.requireAdminRole
    , adminController.getAdminList);
// tạo acc admin
router.post('/createAdminAccount'
    , authMiddleware.requireAdminRole
    , adminController.createAdminAccount);
// xóa acc admin
router.delete('/deleteAdminAccount'
    , authMiddleware.requireAdminRole
    , adminController.deleteAdminAccount);
// lấy lịch sử giao dịch của web
router.get('/getWebPaymentHistory'
    , authMiddleware.requireAdminRole
    , adminController.getWebPaymentHistory);
//  lấy 6 tour bán chạy nhất
router.get('/getTopSellingTours'
    , authMiddleware.requireAdminRole
    , adminController.getTopSellingTours);
// lấy tất cả order
router.get('/getAllOrders'
    , authMiddleware.requireAdminRole
    , adminController.getAllOrders);
// search order theo tour code
router.get('/orders/search'
    , authMiddleware.requireAdminRole
    , adminController.searchOrdersByTourCode);
router.get('/getBookingStats'
    , authMiddleware.requireAdminRole
    , adminController.getBookingStats);
router.put('/changePassword'
    , authMiddleware.requireAdminRole
    , adminController.changePassword);
router.get('/getUncancelledOrders'
    , authMiddleware.requireAdminRole
    , adminController.getUncancelledOrders);
module.exports = router;

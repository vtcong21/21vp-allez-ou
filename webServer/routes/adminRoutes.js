const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// render trang admin
router.get('/'
    , authMiddleware.requireAdminRole
    , adminController.renderAdminPage);
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
// trang dashboard
router.get('/dashboard'
    , authMiddleware.requireAdminRole
    , adminController.deleteAdminAccount)

module.exports = router;

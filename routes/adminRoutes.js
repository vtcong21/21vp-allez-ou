const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');



// render trang admin
router.get('/'
    // , authMiddleware.adminMiddleware
    , adminController.renderAdminPage);
// trả mảng client
router.get('/getClientList'
    // , authMiddleware.adminMiddleware
    , adminController.getClientList);
// trả manrg user
router.get('/getAdminList'
    // , authMiddleware.adminMiddleware
    , adminController.getAdminList);
// tạo acc admin
router.post('/createAdminAccount'
    // , authMiddleware.adminMiddleware
    , adminController.createAdminAccount);
// xóa acc admin
router.delete('/deleteAdminAccount'
    // , authMiddleware.adminMiddleware
    , adminController.deleteAdminAccount);

module.exports = router;

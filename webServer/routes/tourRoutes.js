const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middlewares/authMiddleware');


// tìm kiếm tour
router.get('/search'
    , tourController.searchTours);

// trả về toàn bộ tour
router.get('/'
    , tourController.getAllTours);

// trả về tour ẩn, quyền admin
router.get('/hiddentTours'
    , authMiddleware.requireAdminRole
    , tourController.getHiddenTours);


// tạo tour, admin mới được tạo
router.post('/'
    , authMiddleware.requireAdminRole
    , tourController.createTour);

// render trang tour search
router.get('/toursSearchPage'
    , tourController.getTourSearchPage);


// lấy data tour
router.get('/tourData/:code'
    , tourController.getTourInfoData);

// xóa tour, admin mới được xóa
router.delete('/:code'
    , authMiddleware.requireAdminRole
    , tourController.deleteTour);

// render trang tour info
router.get('/:code'
    , tourController.getTourByCode);

module.exports = router;

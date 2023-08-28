const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middlewares/authMiddleware');
const convertUserDataMiddleware = require('../middlewares/convertUserDataMiddleware');


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

// ẩn tour, admin mới được ẩn
router.put('/hideTour/:code'
    , authMiddleware.requireAdminRole
    , tourController.hideTour);

// hiện tour, admin mới được hiện
router.put('/displayTour/:code'
, authMiddleware.requireAdminRole
, tourController.displayTour);

// Lấy các top tour
router.get('/getTopSellingTours'
    , tourController.getTopSellingTours);

// render trang tour info
router.get('/:code'
    , authMiddleware.authenticateToken
    , convertUserDataMiddleware.getUserData
    , tourController.getTourByCode);

router.put('/edit/:code'
    , authMiddleware.requireAdminRole
    , tourController.editTourByCode);


module.exports = router;

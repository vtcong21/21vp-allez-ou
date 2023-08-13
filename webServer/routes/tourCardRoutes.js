const express = require('express');
const router = express.Router();
const tourCardController = require('../controllers/tourCardController');
const authMiddleware = require('../middlewares/authMiddleware');
const convertUserDataMiddleware = require('../middlewares/convertUserDataMiddleware');


// tìm tourCards
router.get('/search'
, authMiddleware.authenticateToken
, convertUserDataMiddleware.getUserData
, tourCardController.searchTourCards);
// lấy về toàn bộ ds tourCard
router.get('/'
// , authMiddleware.authenticateToken
, tourCardController.getAllTourCards);
// lấy 3 tourCard random
router.get('/randomTourCards'
// , authMiddleware.authenticateToken
, tourCardController.getRandom3TourCards);
// lấy tourCard theo code
router.get('/:code'
// , authMiddleware.authenticateToken
, tourCardController.getTourCardByCode);




module.exports = router;


const express = require('express');
const router = express.Router();
const tourCardController = require('../controllers/tourCardController');
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/search',authMiddleware.authenticateToken, tourCardController.searchTourCards);
router.get('/',authMiddleware.authenticateToken, tourCardController.getAllTourCards);
router.get('/:code',authMiddleware.authenticateToken, tourCardController.getTourCardByCode);
router.get('/randomTourCards',authMiddleware.authenticateToken, tourCardController.getRandom3TourCards);



module.exports = router;

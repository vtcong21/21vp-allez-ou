const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/search',authMiddleware.authenticateToken, tourController.searchTours);
router.get('/'
// ,authMiddleware.authenticateToken
, tourController.getAllTours);
router.post('/',authMiddleware.authenticateToken, tourController.createTour);
router.delete('/:code',authMiddleware.authenticateToken, tourController.deleteTour);
router.get('/:code'
// ,authMiddleware.authenticateToken
,tourController.getTourByCode);
module.exports = router;

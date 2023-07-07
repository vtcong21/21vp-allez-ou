const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.get('/search', tourController.searchTours);
router.get('/', tourController.getAllTours);
router.post('/', tourController.createTour);
router.delete('/:code', tourController.deleteTour);
router.get('/:code', tourController.getTourByCode);

module.exports = router;

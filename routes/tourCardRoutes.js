const express = require('express');
const router = express.Router();
const tourCardController = require('../controllers/tourCardController');




router.get('/search', tourCardController.searchTourCards);
router.get('/', tourCardController.getAllTourCards);
router.get('/:code', tourCardController.getTourCardByCode);
router.get('/randomTourCards', tourCardController.getRandom3TourCards);



module.exports = router;

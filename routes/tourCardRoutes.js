const express = require('express');
const router = express.Router();
const tourCardController = require('../controllers/tourCardController');




router.get('/search', tourCardController.searchTourCards);
router.get('/', tourCardController.getAllTourCards);
router.get('/:code', tourCardController.getTourCardByCode);

module.exports = router;

const express = require('express');
const router = express.Router();
const tourCardController = require('../controllers/tourCardController');

router.get('/', tourCardController.getAllTourCards);
router.get('/search', tourCardController.searchTourCards);
router.get('/:code', tourCardController.getTourCardByCode);

module.exports = router;

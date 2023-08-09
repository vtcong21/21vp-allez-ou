const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const tourSearchController = require('../controllers/tourSearchController');

router.get('/', authMiddleware.authenticateToken, tourSearchController.getTourSearchPage);


module.exports = router;

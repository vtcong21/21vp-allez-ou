const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const homeController = require('../controllers/homeController');

router.get('/', authMiddleware.authenticateToken, homeController.getHomePage);


module.exports = router;

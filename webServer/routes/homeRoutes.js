const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const homeController = require('../controllers/homeController');
const convertUserDataMiddleware = require('../middlewares/convertUserDataMiddleware');

router.get('/'
, authMiddleware.authenticateToken
, convertUserDataMiddleware.getUserData
, homeController.getHomePage);


module.exports = router;

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/indexController');

router.get('/', homeController.getHomePage);

module.exports = router;

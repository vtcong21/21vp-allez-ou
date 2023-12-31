const express = require('express');
const router = express.Router();
const provinceController = require('../controllers/provinceController');
//const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',  provinceController.getAllProvinces);
router.get('/:code',  provinceController.getProvinceByCode);

module.exports = router;

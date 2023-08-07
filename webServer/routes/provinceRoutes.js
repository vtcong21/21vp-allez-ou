const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const provinceController = require('../controllers/provinceController');

router.get('/', authMiddleware.authenticateToken, provinceController.getAllProvinces);
router.get('/:code', authMiddleware.authenticateToken, provinceController.getProvinceByCode);

module.exports = router;

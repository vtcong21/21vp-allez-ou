const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');


// trả mảng doanh thu tất cả các tháng trong năm
router.get('/getMonthlyRevenuesThisYear'
    // , authMiddleware.adminMiddleware
    , dashboardController.updateRevenue);
// trả % lợi nhuận tháng này so với tháng trước
router.get('/getProfitPercentageThisMonth'
    // , authMiddleware.adminMiddleware
    , dashboardController.getProfitPercentageThisMonth);
// lấy doanh thu 7 ngày gần nhất tính từ hôm nay
router.post('/getRevenueLast7Days'
    // , authMiddleware.adminMiddleware
    , dashboardController.getRevenueLast7Days);
//tìm mảng doanh thu các tháng theo năm
router.get('/searchMonthlyRevenuesByYear'
    // , authMiddleware.adminMiddleware
    , dashboardController.searchMonthlyRevenuesByYear);



module.exports = router;

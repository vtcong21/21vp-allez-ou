const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// chưa xong
// trả mảng doanh thu tất cả các tháng trong năm
router.get('/getMonthlyRevenuesThisYear'
    // , authMiddleware.adminMiddleware
    , dashboardController.getMonthlyRevenuesThisYear);
// trả % lợi nhuận & doanh thu tháng này so với tháng trước
router.get('/getRevenueAndProfitPercentageThisMonth'
    // , authMiddleware.adminMiddleware
    , dashboardController.getRevenueAndProfitPercentageThisMonth);
// lấy doanh thu 7 ngày gần nhất tính từ hôm nay
router.get('/getRevenueLast7Days'
    // , authMiddleware.adminMiddleware
    , dashboardController.getRevenueLast7Days);
// tìm mảng doanh thu các tháng theo năm
router.get('/searchMonthlyRevenuesByYear'
    // , authMiddleware.adminMiddleware
    , dashboardController.searchMonthlyRevenuesByYear);
// gọi cập nhật doanh thu của HÔM NAY
router.put('/updateTodayRevenue'
    // , authMiddleware.adminMiddleware
    , dashboardController.updateTodayRevenue);


module.exports = router;

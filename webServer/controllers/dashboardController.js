const Dashboard = require('../models/dashboard');
const Tour = require('../models/tour');
const axios = require('axios');
const cron = require('node-cron');
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });


const webPaymentAccountId = '64b79fc6896f214f7aae7ddc';

// cái này là lập lịch lấy doanh thu NGÀY HÔM QUA vào 0:00----------------------------------------------
const updateRevenue = async () => {
    try {
        const accountId = webPaymentAccountId;
        const response = await axios.get('https://localhost:5001/accounts/getTodayPaymentHistory', {
            params: {
                accountId: accountId
            },
            httpsAgent: agent
        });
        const paymentHistory = response.data.paymentHistory;
        
        // Lấy ngày hôm nay
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1); // Lấy ngày hôm qua
        yesterday.setUTCHours(0, 0, 0, 0);
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        let dashboard = await Dashboard.findOne()
        if (!dashboard) {
            return console.error({ message: 'Cannot find dashboard' });
        }

        const currentMonth = dashboard.monthlyRevenue.find(monthRevenue => monthRevenue.month === month && monthRevenue.year === year);
        if (!currentMonth) {
            dashboard.monthlyRevenue.push({
                month: month,
                year: year,
                dailyRevenue: [],
                revenue: 0,
            });
        }

        const currentMonthIndex = dashboard.monthlyRevenue.findIndex(monthRevenue => monthRevenue.month === month && monthRevenue.year === year);

        // Kiểm tra xem đã tồn tại một bản ghi cho ngày hôm qua trong danh sách dailyRevenue chưa
        const existingRecord = dashboard.monthlyRevenue[currentMonthIndex].dailyRevenue.find(record => {

            const recordDate = new Date(record.date);
            return recordDate.getTime() === yesterday.getTime();
        });
        
        if (!existingRecord) {
            // Nếu chưa có bản ghi cho ngày hôm qua, thì thêm mới
            console.log(1);
            const totalAmount = paymentHistory.reduce((total, history) => total + history.amount, 0);
            console.log(totalAmount);
            const newDailyRevenue = {
                date: yesterday,   // Đảm bảo bạn đã định nghĩa yesterday ở đâu đó trong mã của bạn
                revenue: totalAmount,   // Đảm bảo bạn đã tính toán totalAmount ở đâu đó trong mã của bạn
            };
            
            dashboard.monthlyRevenue[currentMonthIndex].dailyRevenue.push(newDailyRevenue);
        }


        const monthRevenue = dashboard.monthlyRevenue[currentMonthIndex];
        monthRevenue.revenue = monthRevenue.dailyRevenue.reduce((total, daily) => total + daily.revenue, 0);
        await dashboard.save();
        console.log('Updated revenue at', yesterday);
    } catch (error) {
        console.error('Error updating revenue:', error.message);
    }
};




// update trạng thái ẩn, lập lịch 0:00 -----------------------------------------------------------------
const updateToursState = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây của ngày hôm nay thành 0 để so sánh chính xác ngày

        const tours = await Tour.find({ date: today });

        for (const tour of tours) {
            if (tour.isHidden == false) {
                tour.isHidden = true;
            }
            await tour.save(); // Cập nhật trạng thái isHidden của tour thành true
        }

        console.log('Updated tour state');
    } catch (error) {
        console.error('Error updating tour state:', error.message);
    }
};

// Lên lịch chạy công việc cập nhật doanh thu vào lúc 0:00 hàng ngày
cron.schedule('0 1 * * *', () => {
    updateRevenue();
    updateToursState();
});
// --------------------------------------------------------------------------------------------

const updateTodayRevenue = async (req, res) => {
    try {
        const accountId = webPaymentAccountId;
        const response = await axios.get('https://localhost:5001/accounts/getTodayPaymentHistory', {
            params: {
                accountId: accountId
            },
            httpsAgent: agent
        });
        const paymentHistory = response.data.paymentHistory;
        
        // Lấy ngày hôm nay
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1); // Lấy ngày hôm qua
        yesterday.setUTCHours(0, 0, 0, 0);
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        let dashboard = await Dashboard.findOne();
        if (!dashboard) {
            return res.status(404).json({ message: 'Cannot find dashboard' });
        }

        const currentMonth = dashboard.monthlyRevenue.find(monthRevenue => monthRevenue.month === month && monthRevenue.year === year);
        if (!currentMonth) {
            dashboard.monthlyRevenue.push({
                month: month,
                year: year,
                dailyRevenue: [],
                revenue: 0,
            });
        }

        const currentMonthIndex = dashboard.monthlyRevenue.findIndex(monthRevenue => monthRevenue.month === month && monthRevenue.year === year);

        // Kiểm tra xem đã tồn tại một bản ghi cho ngày hôm qua trong danh sách dailyRevenue chưa
        const existingRecord = dashboard.monthlyRevenue[currentMonthIndex].dailyRevenue.find(record => {

            const recordDate = new Date(record.date);
            return recordDate.getTime() === yesterday.getTime();
        });
        
        if (!existingRecord) {
            // Nếu chưa có bản ghi cho ngày hôm qua, thì thêm mới
            console.log(1);
            const totalAmount = paymentHistory.reduce((total, history) => total + history.amount, 0);
            console.log(totalAmount);
            const newDailyRevenue = {
                date: yesterday,   // Đảm bảo bạn đã định nghĩa yesterday ở đâu đó trong mã của bạn
                revenue: totalAmount,   // Đảm bảo bạn đã tính toán totalAmount ở đâu đó trong mã của bạn
            };
            
            dashboard.monthlyRevenue[currentMonthIndex].dailyRevenue.push(newDailyRevenue);
        }


        const monthRevenue = dashboard.monthlyRevenue[currentMonthIndex];
        monthRevenue.revenue = monthRevenue.dailyRevenue.reduce((total, daily) => total + daily.revenue, 0);
        await dashboard.save();

        console.log('Updated revenue for today at', today);
        res.status(200).json({ message: 'Updated revenue for today' });
    } catch (error) {
        console.error('Error updating revenue:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getMonthlyRevenuesThisYear = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const dashboard = await Dashboard.findOne();

        if (!dashboard) {
            return res.status(404).json({ message: 'Cannot find dashboard' });
        }
        const monthlyRevenuesThisYear = dashboard.monthlyRevenue.filter(
            (monthlyRevenue) => monthlyRevenue.year === currentYear
        );

        res.status(200).json(monthlyRevenuesThisYear);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const searchMonthlyRevenuesByYear = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ message: 'No year query' });
        }
        const parsedYear = parseInt(year);
        if (isNaN(parsedYear)) {
            return res.status(400).json({ message: 'Invalid year' });
        }
        const dashboard = await Dashboard.findOne();

        if (!dashboard) {
            return res.status(404).json({ message: 'Cannot find dashboard' });
        }
        const monthlyRevenuesByYear = dashboard.monthlyRevenue.filter(
            (monthlyRevenue) => monthlyRevenue.year === parsedYear
        );
        res.status(200).json(monthlyRevenuesByYear);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRevenueAndProfitPercentageThisMonth = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const dashboard = await Dashboard.findOne();

        if (!dashboard) {
            throw new Error('Cannot find dashboard');
        }
        const currentMonthRevenue = dashboard.monthlyRevenue.find(
            (monthlyRevenue) => monthlyRevenue.year === currentYear && monthlyRevenue.month === currentMonth
        );
        const previousMonthRevenue = dashboard.monthlyRevenue.find(
            (monthlyRevenue) => monthlyRevenue.year === currentYear && monthlyRevenue.month === currentMonth - 1
        );

        if (!currentMonthRevenue || !previousMonthRevenue) {
            throw new Error('Cannot find profit data');
        }

        const currentMonthProfit = currentMonthRevenue.revenue;
        const previousMonthProfit = previousMonthRevenue.revenue;

        const profitPercentage = ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) * 100;

        res.status(200).json({
            currentMonthRevenue: currentMonthProfit,
            profitPercentage: profitPercentage
        });
    } catch (error) {
        console.error('Error fetching revenue and profit percentage:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRevenueLast7Days = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne();
        let last7DaysRevenue = [];
        let daysCount = 0;
        for (let i = dashboard.monthlyRevenue.length - 1; i >= 0 && daysCount < 7; i--) {
            const monthly = dashboard.monthlyRevenue[i];
            const dailyRevenue = monthly.dailyRevenue;
            for (let j = dailyRevenue.length - 1; j >= 0 && daysCount < 7; j--) {
                const daily = dailyRevenue[j];
                last7DaysRevenue.push(daily);
                daysCount++;
                //console.log(daily);
            }
        }
        res.status(200).json({ last7DaysRevenue });
    } catch (error) {
        console.error('Error in get 7 days revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    getMonthlyRevenuesThisYear,
    getRevenueAndProfitPercentageThisMonth,
    searchMonthlyRevenuesByYear,
    getRevenueLast7Days,
    updateRevenue,
    updateTodayRevenue,
    updateToursState
}
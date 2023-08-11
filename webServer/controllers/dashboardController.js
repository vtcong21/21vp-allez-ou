const Dashboard = require('../models/dashboard');
const axios = require('axios');
const cron = require('node-cron');

const webPaymentAccountId = '64b79fc6896f214f7aae7ddc';


const updateRevenue = async (req, res) => {
    try {
        const accountId = webPaymentAccountId;
        const response = await axios.get('http://localhost:5001/accounts/getTodayPaymentHistory'
            , {
                params: {
                    accountId: accountId
                }
            }
        );
        const paymentHistory = response.data.paymentHistory;
        console.log(response.data);
        // Lấy ngày hôm nay
        const today = new Date();
        //const day = today.getDate();
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

        // Tìm tháng hiện tại
        const currentMonthIndex = dashboard.monthlyRevenue.findIndex(monthRevenue => monthRevenue.month === month && monthRevenue.year === year);

        // Cập nhật dailyRevenue cho ngày hôm nay
        dashboard.monthlyRevenue[currentMonthIndex].dailyRevenue.push({
            date: today,
            revenue: paymentHistory.reduce((total, history) => total + history.amount, 0),
        });

        // Tính tổng doanh thu trong tháng
        const monthRevenue = dashboard.monthlyRevenue[currentMonthIndex];
        monthRevenue.revenue = monthRevenue.dailyRevenue.reduce((total, daily) => total + daily.revenue, 0);
        await dashboard.save();

        console.log('Updated revenue at', today);
    } catch (error) {
        console.error('Error updating revenue:', error.message);
    }
};

// Lên lịch chạy công việc cập nhật doanh thu vào lúc 0:00 hàng ngày
cron.schedule('0 0 * * *', () => {
    updateRevenue();
});


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

const getProfitPercentageThisMonth = async (req, res) => {
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
            throw new Error('Cannot fint profit');
        }

        const currentMonthProfit = currentMonthRevenue.revenue;
        const previousMonthProfit = previousMonthRevenue.revenue;

        const profitPercentage = ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) * 100;

        res.status(200).json(profitPercentage);
    } catch (err) {
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
                console.log(daily);
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
    getProfitPercentageThisMonth,
    searchMonthlyRevenuesByYear,
    getRevenueLast7Days,
    updateRevenue
}
const mongoose = require('mongoose');

const dailyRevenueSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  revenue: { type: Number, default: 0 },
});

const monthlyRevenueSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  revenue: { type: Number, default: 0 },
});

const dashboardSchema = new mongoose.Schema({
  systemPaymentAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount', required: true },
  dailyRevenue: [dailyRevenueSchema],
  monthlyRevenue: [monthlyRevenueSchema],
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema, 'dashboard');
module.exports = Dashboard;

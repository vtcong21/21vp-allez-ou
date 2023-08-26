const User = require('../models/user');
const Item = require('../models/item');
const Tour = require('../models/tour')
const bcrypt = require('bcrypt');
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const webPaymentAccountId = '64b79fc6896f214f7aae7ddc';

const renderDashboardPage = async (req, res) => {
    try {
        if (!req.userRole) res.render('error');
        else {
            const user = await User.findById(req.userId).select('_id fullName');
            res.render('admin', { user, title: 'dashboard' });
        }
    } catch (error) {
        console.error('Error getting user information:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getClientList = async (req, res) => {
    try {
        const clientList = await User.find({ isAdmin: 0 }, '_id fullName gender dateOfBirth dateCreate email phoneNumber');

        res.status(200).json(clientList);
    } catch (error) {
        console.error('Error in get client list:', error);
        res.status(500).json({ message: error });
    }
};

const getAdminList = async (req, res) => {
    try {
        const clientList = await User.find({ isAdmin: 1 }, '_id fullName');

        res.status(200).json(clientList);
    } catch (error) {
        console.error('Error in get client list:', error);
        res.status(500).json({ message: error });
    }
};

const createAdminAccount = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new User({
            fullName,
            email,
            password: hashedPassword,
            verificationCode: undefined,
            isVerified: true,
            isAdmin: true
        });
        await admin.save();
        res.status(200).json({ message: "admin created successfully" });
    } catch (error) {
        console.error('Error in create admin account:', error);
        res.status(500).json({ message: error });
    }
}

const deleteAdminAccount = async (req, res) => {
    try {
        const { adminId } = req.body;
        const user = await User.findById(adminId);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find account' });
        }
        if (user.isAdmin) {
            await User.findByIdAndRemove(adminId);
            return res.status(200).json({ message: 'Completed' });
        } else {
            return res.status(403).json({ message: 'Account is not admin' });
        }
    } catch (error) {
        console.error('Error in delete admin account:', error);
        res.status(500).json({ message: error });
    }
};

const renderOrderPage = async (req, res) => {
    try {
        if (!req.userRole) res.render('error');
        else {
            const user = await User.findById(req.userId).select('_id fullName');
            res.render('admin', { user, title: 'orders' });
        }
    } catch (error) {
        console.error('Error getting user information:', error);
        res.status(500).send('Internal Server Error');
    }
}

const renderTourPage = async (req, res) => {
    try {
        if (!req.userRole) res.render('error');
        else {
            const user = await User.findById(req.userId).select('_id fullName');
            res.render('admin', { user, title: 'tours' });
        }
    } catch (error) {
        console.error('Error getting user information:', error);
        res.status(500).send('Internal Server Error');
    }
}

const renderClientPage = async (req, res) => {
    try {
        if (!req.userRole) res.render('error');
        else {
            const user = await User.findById(req.userId).select('_id fullName');
            res.render('admin', { user, title: 'client' });
        }
    } catch (error) {
        console.error('Error getting user information:', error);
        res.status(500).send('Internal Server Error');
    }
}

const renderAdminRolePage = async (req, res) => {
    try {
        if (!req.userRole) res.render('error');
        else {
            const user = await User.findById(req.userId).select('_id fullName');
            res.render('admin', { user, title: 'admin-role' });
        }
    } catch (error) {
        console.error('Error getting user information:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function fetchPaymentHistory(accountId) {
    try {
        const response = await axios.get(`https://localhost:5001/accounts/getPaymentHistory?accountId=${accountId}`,  {httpsAgent: agent});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getWebPaymentHistory = async (req, res) => {
    try {
        if (!accountId) {
            return res.status(400).json({ message: 'accountId is required' });
        }
        const paymentHistory = await fetchPaymentHistory(webPaymentAccountId);
        if (paymentHistory !== null) {
            return res.status(200).json(paymentHistory);
        } else {
            return res.status(500).json({ message: 'Failed to fetch payment history' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getTopSellingTours = async (req, res) => {
    try {
        const tours = await Tour.find({ isHidden: false })
            .sort({ slots: -1, remainSlots: -1 })
            .limit(6);

        res.status(200).json(tours);
    } catch (error) {
        console.error('Error fetching top selling tours:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Item.find({ isPaid: true });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUncancelledOrders = async(req, res) =>{
    try {
        const orders = await Item.find({ isPaid: true, status: { $ne: 'Cancelled' } });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const searchOrdersByTourCode = async (req, res) => {
    try {
        const { tourCode } = req.query;

        const orders = await Item.find({ isPaid: true, 'tourCode': tourCode });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error searching orders by tour code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBookingStats = async (req, res) =>{
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);



        const ordersThisMonth = await Item.find({
            isPaid: true,
            orderDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });



        const ordersLastMonth = await Item.find({
            isPaid: true,
            orderDate: { $gte: firstDayOfLastMonth, $lte: firstDayOfMonth }
        });

        
        const ticketsThisMonth = ordersThisMonth.reduce((totalTickets, order) => totalTickets + order.tickets.length, 0);
        const ticketsLastMonth = ordersLastMonth.reduce((totalTickets, order) => totalTickets + order.tickets.length, 0);

       
        const ticketPercentageChange = ((ticketsThisMonth - ticketsLastMonth) / ticketsLastMonth) * 100;

        res.status(200).json({
            ticketsThisMonth: ticketsThisMonth,
            ticketPercentageChange: ticketPercentageChange
        });
    } catch (error) {
        console.error('Error fetching ticket stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    getBookingStats,
    getAdminList,
    getClientList,
    getTopSellingTours,
    getWebPaymentHistory,
    getAllOrders,
    createAdminAccount,
    deleteAdminAccount,
    renderDashboardPage,
    renderOrderPage,
    renderTourPage,
    renderClientPage,
    renderAdminRolePage,
    searchOrdersByTourCode,
    changePassword,
    getUncancelledOrders
}
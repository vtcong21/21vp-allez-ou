const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcrypt');


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
        const response = await axios.get(`http://localhost:5001/accounts/getPaymentHistory?accountId=${accountId}`);
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
        const tours = await Tour.find()
            .sort({ $expr: { $subtract: ['$slots', '$remainSlots'] } })
            .limit(6);

        res.status(200).json(tours);
    } catch (error) {
        console.error('Error fetching top selling tours:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllOrders = async (req, res) =>{
    try {
        const orders = await Item.find({ isPaid: true });
    
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

module.exports = {
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
    searchOrdersByTourCode
}
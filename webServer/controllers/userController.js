const User = require('../models/user');
const Item = require('../models/item');
const Tour = require('../models/tour');
const mailController = require('./mailController');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({ rejectUnauthorized: false });
const { ObjectId } = require('mongodb');


const webPaymentAccountId = '64b79fc6896f214f7aae7ddc';

const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('fullName email dateOfBirth');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ fullName: user.fullName });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAnOrder = async (cartItem, user, item) => {
  cartItem.isPaid = true;
  user.cart.pull(cartItem._id);
  user.orders.push(cartItem._id);
  cartItem.representer = item.representer;
  cartItem.tickets = item.tickets;
  cartItem.totalPrice = item.totalPrice;
  cartItem.orderDate = item.orderDate;
  cartItem.status = 'Success';
  cartItem.shippingAddress = item.shippingAddress;
  cartItem.orderDate = new Date();
  await cartItem.save();
  await user.save();
};

const pay = async (req, res) => {
  try {
    const {item, OTPCode}  = req.body;
    // const item  = req.body;
    const userId = req.userId;
    console.log(item);
    console.log(OTPCode);
    // console.log("id:" + item._id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartItem = await Item.findOne({ _id: item._id });

    if (!cartItem) {
      return res.status(400).json({ error: 'Item not found' });
    }

    const isCartItemInCart = user.cart.some(cartItemId => cartItemId.toString() === cartItem._id.toString());
    if (!isCartItemInCart) {
      return res.status(400).json({ error: 'Item not found in cart' });
    }//chỗ này cần xem lại

    const tour = await Tour.findOne({ code: cartItem.tourCode });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    if (item.tickets.length > tour.remainSlots) {
      return res.status(400).json({ error: 'Not enough available slots for the tickets' });
    }

    const response = await axios.post('https://localhost:5001/accounts/sendMoney', {
      email: user.email,
      OTPCode: OTPCode,
      senderAccountId: userId,
      recipientAccountId: webPaymentAccountId,
      amount: cartItem.totalPrice,
      itemId: item._id
    }, {httpsAgent: agent});

    if (response.status === 400) {
      return res.status(400).json({ error: 'Insufficient balance' });
    } else if (response.data.success) {
      // tạo order -> gửi mail -> trừ remain slots
      await createAnOrder(cartItem, user, item);
      await mailController.sendConfirmationEmail(user, cartItem, tour);
      tour.remainSlots -= item.tickets.length;
      await tour.save();
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error('Pay error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function fetchPaymentHistory(accountId) {
  try {
    const response = await axios.get(`https://localhost:5001/accounts/getPaymentHistory?accountId=${accountId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getUserPaymentHistory = async (req, res) => {
  try {
    const accountId = req.userId;
    if (!accountId) {
      return res.status(400).json({ message: 'accountId is required' });
    }

    const paymentHistory = await fetchPaymentHistory(accountId);
    if (paymentHistory !== null) {
      return res.status(200).json(paymentHistory);
    } else {
      return res.status(500).json({ message: 'Failed to fetch payment history' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderPage = async (req, res) => {
  if (req.userRole === 0 || req.userRole === false) {
    try {
      const itemId = req.params.itemId;
      const user = req.user;

      const item = await Item.findById(itemId);
      const tourData = await Tour.findOne({ code: item.tourCode });

      res.status(200).render('dangkytour', { user, itemId, tourData, title: null });
    } catch (error) {
      console.error('Error rendering order page:', error);
      res.status(500).render('error');
    }
  } else {
    res.status(403).render('error');
  }
};

const sendOTPpayment = async (req, res) => {
  try {
    const { email } = req.body;

    const response = await axios.post('https://localhost:5001/accounts/sendOTP', {
        email: email 
    }, {httpsAgent: agent});
    
    if (response.status === 200) {
        res.status(200).json({ success: true });
    }
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
  }
};

const checkVerifyOTP = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    console.log(req.body);
    console.log(verificationCode);
    const response = await axios.post('https://localhost:5001/accounts/verifyOTP', {
        email: email,
        OTPCode: verificationCode 
    }, {httpsAgent: agent});
    
    if (response.status === 200) {
        res.status(200).json({ valide: true });
    }
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
  }
};


const getBalanceEmail = async(req, res) =>{
  try{
    
    const userId = req.userId;
    const response = await axios.post('https://localhost:5001/accounts/sendBalanceEmail', {
        email: email,
        userId: userId
    }, {httpsAgent: agent});
    
    if (response.status === 200) {
        res.status(200).json({ valide: "sended" });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
  getOrderPage,
  getUserInfo,
  getUserPaymentHistory,
  pay,
  sendOTPpayment,
  checkVerifyOTP,
  getBalanceEmail
};

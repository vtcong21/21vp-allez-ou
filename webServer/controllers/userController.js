const User = require('../models/user');
const Item = require('../models/item');
const Tour = require('../models/tour');
const mailController = require('./mailController');
const axios = require('axios');


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
    const { item } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartItem = await Item.findById(item._id);

    if (!cartItem) {
      return res.status(400).json({ error: 'Item not found' });
    }

    const isCartItemInCart = user.cart.some(cartItemId => cartItemId.toString() === cartItem._id.toString());
    if (!isCartItemInCart) {
      return res.status(400).json({ error: 'Item not found in cart' });
    }

    const tour = await Tour.findOne({ code: cartItem.tourCode });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    if (item.tickets.length > tour.remainSlots) {
      return res.status(400).json({ error: 'Not enough available slots for the tickets' });
    }

    const response = await axios.post('http://localhost:5001/accounts/sendMoney', {
      senderAccountId: userId,
      recipientAccountId: webPaymentAccountId,
      amount: cartItem.totalPrice,
      itemId: item._id
    });

    if (response.status === 400) {
      return res.status(400).json({ error: 'Insufficient balance' });
    } else if (response.data.success) {
      // tạo order -> gửi mail -> trừ remain slots
      await createAnOrder(cartItem, user, item);
      await mailController.sendConfirmationEmail(user, cartItem, tour);
      tour.remainSlots -= item.tickets.length;
      return res.json({ success: true });
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
    const response = await axios.get(`http://localhost:5001/accounts/getPaymentHistory?accountId=${accountId}`);
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
<<<<<<< HEAD
      const itemId = req.params.itemId; 
      const user = req.user;

      const item = await Item.findById(itemId);
      const tourData = await Tour.findOne({ code: item.tourCode }); 
    
      res.status(200).render('dangkytour', { user, itemId, tourData, title: null });
=======
       const { itemId, tourCode } = req.body;
      //  let user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');
       const user = req.user
      console.log(req.body);
       const tourData = await Tour.findOne({code: 'NDSGN1871-109-270623VU-V'});
      res.status(200).render('dangkytour', { user, itemId, tourData, title:null });
>>>>>>> dev
    } catch (error) {
      console.error('Error rendering order page:', error);
      res.status(500).render('error');
    }
  } else {  
    res.status(403).render('error');
  }
}



module.exports = {
  getOrderPage,
  getUserInfo,
  getUserPaymentHistory,
  pay
};

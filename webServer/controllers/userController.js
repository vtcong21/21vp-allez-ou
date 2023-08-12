const User = require('../models/user');
const Item = require('../models/item');
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
  cartItem.tickets = item.tickets;
  cartItem.totalPrice = item.totalPrice;
  cartItem.orderDate = item.orderDate;
  cartItem.status = 'Shipping';
  cartItem.shippingAddress = item.shippingAddress;
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

    const response = await axios.post('http://localhost:5001/accounts/sendMoney', {
      senderAccountId: userId,
      recipientAccountId: webPaymentAccountId,
      amount: cartItem.totalPrice,
      itemId: item._id
    });

    if (response.status === 400) {
      return res.status(400).json({ error: 'Insufficient balance' });
    } else if (response.data.success) {
      await createAnOrder(cartItem, user, item);
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




module.exports = {
  getUserInfo,
  getUserPaymentHistory,
  pay
};

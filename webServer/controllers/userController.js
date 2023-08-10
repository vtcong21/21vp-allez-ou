const User = require('../models/user');
const axios = require('axios');


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

const pay = async (req, res) =>{
  // này từ từ
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
  getUserPaymentHistory
};

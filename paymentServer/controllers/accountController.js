// const mongoose = require('mongoose');
const PaymentAccount = require('../models/paymentAccount');
const mailController = require('../controllers/mail');
const OTP = require('../models/OTP');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        // Tạo mã OTP
        const OTPCode = generateOTP();

        const otp = new OTP({
            email: email,
            code: OTPCode,
            expiration: new Date(new Date().getTime() + 2 * 60000) // 2 phút sau
        });
        await otp.save();
        await mailController.sendOTPEmail(email, OTPCode);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const verify = async (req, res) => {
    try {
      const { email, OTPCode } = req.body;
      const foundOTP = await OTP.findOne({ email: email, code: OTPCode });
      console.log(email);
      console.log(OTPCode);
      if (!foundOTP) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

    if (foundOTP.expiration < new Date()) {
        //await User.deleteOne({ email });
        return res.status(400).json({ message: 'Incorrect verification code (expired)' });
    }
      console.log(foundOTP);
    //   await OTP.deleteOne({ email: email, code: OTPCode });
      res.status(200).json({ otpinput: true });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
}

const sendMoney = async (req, res) => {
    try {
        const { senderAccountId, recipientAccountId, amount, itemId } = req.body;
        const transferAmount = parseInt(amount);
        const senderAccount = await PaymentAccount.findById(senderAccountId);

        const recipientAccount = await PaymentAccount.findById(recipientAccountId);

        if (!senderAccount || !recipientAccount) {
            return res.status(404).json({ error: 'Payment account not found' });
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        senderAccount.balance -= transferAmount;

        recipientAccount.balance += transferAmount;

        const bill = {
            itemId: itemId,
            amount: transferAmount,
            recipientAccount: recipientAccountId
        };
        senderAccount.paymentHistory.push(bill);

        // Tạo hóa đơn cho tài khoản nhận
        const recipientBill = {
            itemId: itemId,
            amount: transferAmount,
            senderAccount: senderAccountId
        };
        recipientAccount.paymentHistory.push(recipientBill);

        // Lưu thay đổi
        await senderAccount.save();
        await recipientAccount.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Send money error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getPaymentHistory = async (req, res) => {
    try {
        const { accountId } = req.query;
        const account = await PaymentAccount.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Payment account not found' });
        }
        const paymentHistory = account.paymentHistory;

        res.status(200).json({ paymentHistory: paymentHistory });

    } catch (error) {
        console.error('get payment history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTodayPaymentHistory = async (req, res) => {
    try {
        const  accountId  = req.query.accountId;
        const account = await PaymentAccount.findById(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Payment account not found' });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todayPaymentHistory = account.paymentHistory.filter((bill) => {
            return bill.paymentDate >= today && bill.paymentDate < tomorrow;
        });

        res.status(200).json({ paymentHistory: todayPaymentHistory });
    } catch (error) {
        console.error('get today\'s payment history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        const newAccount = new PaymentAccount({
            _id: userId,
            balance: 100000000,
            paymentHistory: []
        });
        const savedAccount = await newAccount.save();
        return res.status(201).json(savedAccount);
    } catch (error) {
        return res.status(500).json({ error: 'Could not create account' });
    }
};

const sendBalance = async (req, res)=>{
    try{
        const { email, userId } = req.body;
        const account = await PaymentAccount.findById(userId);
        if (!account) {
            return res.status(404).json({ error: 'Payment account not found' });
        }
        await mailController.sendBalanceEmail(email, account.balance);
        res.status(200).json({ success: true });
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { 
    sendMoney, 
    sendBalance,
    getPaymentHistory, 
    getTodayPaymentHistory, 
    createAccount, 
    sendOTP,
    verify,
};
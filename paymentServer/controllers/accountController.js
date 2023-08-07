const PaymentAccount = require('../models/paymentAccount');
const mongoose = require('mongoose');

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

const getPaymentHistory = async(req, res) =>{
    try {
        const { accountId} = req.body;
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

module.exports = {sendMoney, getPaymentHistory};
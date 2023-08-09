const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    recipientAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount'},
    senderAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount'}
});


const paymentAccountSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    paymentHistory: [{ type: billSchema}]
});

const PaymentAccount = mongoose.model('PaymentAccount', paymentAccountSchema, 'payment-accounts');
module.exports = PaymentAccount;

const mongoose = require('mongoose');

const paymentAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 }
});

const PaymentAccount = mongoose.model('PaymentAccount', paymentAccountSchema);
module.exports = PaymentAccount;

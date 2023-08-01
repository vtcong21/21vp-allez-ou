const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    recipientAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount', required: true }
});


const paymentAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    paymentHistory: [{ type: billSchema}]
});

const PaymentAccount = mongoose.model('PaymentAccount', paymentAccountSchema);
module.exports = PaymentAccount;

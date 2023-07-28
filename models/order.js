const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    shippingAddress: { type: String },
    isPaid: { type: Boolean, default: false },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

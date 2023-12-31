const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    tourCode: { type: String, required: true },
    representer: {
        name: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        address: { type: String }
    },
    tickets: [
        {
            type: { type: String, required: true },
            fullName: { type: String, required: true },
            gender: { type: String, enum: ['Male', 'Female', 'Undefined'], required: true },
            dateOfBirth: { type: Date, required: true },
            price: { type: Number, default: 0 }
        }
    ],
    totalPrice: { type: Number, default: 0 },
    orderDate: { type: Date, default: Date.now },
    cancelDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    shippingAddress: { type: String },
    isPaid: { type: Boolean, default: false }
}); 

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Undefined'], required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    bankName: { type: String },
    accountNumber: { type: String },
    accountHolderName: { type: String },
    cart: [
        {
            tourCode: { type: String, ref: 'Tour' },
            tickets: [
                {
                    type: { type: String, required: true },
                    quantity: { type: Number, default: 0 },
                    price: { type: Number, default: 0 },
                }
            ],
            totalPrice: { type: Number }
        }
    ],
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String }

});


const User = mongoose.model('User', userSchema);
module.exports = User;
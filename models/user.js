const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Undefined'], required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    dateCreate: { type: Date, default: Date.now },
    // isBlocked: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

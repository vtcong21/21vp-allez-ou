const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    expiration: {
        type: Date,
        required: true,
    },
}, { timestamps: true }, { collection: 'otps' });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

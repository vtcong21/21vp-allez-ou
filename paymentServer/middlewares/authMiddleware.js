const OTP = require('../models/OTP');

const verifyOTP = async (req, res, next) => {
    try {
        const { email, OTPCode } = req.body;

        // Tìm mã OTP mới nhất cho email đã cung cấp
        const latestOTP = await OTP.findOne({ email: email }).sort({ createdAt: -1 });

        if (!latestOTP) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (latestOTP.code != OTPCode || latestOTP.expiration < new Date()) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Hợp lệ, tiếp tục xử lý
        next();
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { verifyOTP };

const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOTPEmail = async (email, OTPCode) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Ngân hàng VCNLU gửi mã OTP xác nhận thanh toán',
            html: `
              <p>Xin chào!</p>
              <p>Dưới đây là mã xác thực của bạn:</p>
              <h2>${OTPCode}</h2>
              <p>Hãy nhập mã này trong ứng dụng để hoàn tất quá trình xác thực.</p>
              <p>Trân trọng,</p>
              <p>Đội ngũ nhân viên VCNLU</p>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports =  {sendOTPEmail} ;
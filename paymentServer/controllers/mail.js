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


const sendBalanceEmail = async (email, balance) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Thông báo số dư tài khoản',
            html: `
                <p>Xin chào!</p>
                <p>Số dư hiện tại trong tài khoản của bạn là:</p>
                <h2>${balance} VND</h2>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                <p>Trân trọng,</p>
                <p>Đội ngũ nhân viên VCNLU</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Balance email sent');
    } catch (error) {
        console.error('Error sending balance email:', error);
    }
};

module.exports =  {sendOTPEmail, sendBalanceEmail} ;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is: ${verificationCode}`
        };
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

const sendConfirmationEmail = async (user, item, tour) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Allez Où xác nhận đơn đặt tour',
            html: `
                    <p>Xin chào, ${user.name}</p>
                    <p>Cảm ơn bạn đã đặt tour du lịch của chúng tôi. Chúng tôi rất vui thông báo rằng đơn đặt tour của bạn đã được xác nhận thành công.</p>
                    <p>Chi tiết đơn đặt tour:</p>
                    <ul>
                        <li>Tour: ${tour.name}</li>
                        <li>Mã tour: ${item.tourCode}</li>
                        <li>Ngày: ${tour.date.getDate()}/${tour.date.getMonth()}/${tour.date.getYear()}</li>
                        <li>Số lượng vé: ${item.tickets.length}</li>
                    </ul>
                    <p>Chúng tôi sẽ liên hệ với bạn sớm để cung cấp thông tin chi tiết về tour du lịch. Nếu có bất kỳ câu hỏi hoặc yêu cầu nào, xin vui lòng liên hệ với chúng tôi.</p>
                    <p>Trân trọng,<br>Đội ngũ quản lý du lịch.</p>
                `
        };

        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};



module.exports = { sendVerificationEmail, sendConfirmationEmail };
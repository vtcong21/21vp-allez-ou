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
            subject: 'Allez Où gửi mail xác nhận đăng ký tài khoản',
            html: `
                <p>Xin chào!</p>
                <p>Dưới đây là mã xác thực của bạn:</p>
                <h2>${verificationCode}</h2>
                <p>Hãy nhập mã này trong ứng dụng để hoàn tất quá trình xác thực.</p>
                <p>Trân trọng,</p>
                <p>Đội ngũ quản lý du lịch.</p>
            `
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
            to: user.email,
            subject: 'Allez Où xác nhận đơn đặt tour',
            html: `
                    <p>Xin chào, ${user.fullName}</p>
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

const sendCancellationEmail = async (user, item, refundAmount) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Allez Où thông báo hủy đặt tour',
            html: `
                <p>Xin chào, ${user.fullName}</p>
                <p>Chúng tôi xin thông báo rằng đơn đặt tour của bạn đã được hủy thành công.</p>
                <p>Thông tin hủy đặt tour:</p>
                <ul>
                    <li>Tour: ${item.tour.name}</li>
                    <li>Mã tour: ${item.tour.tourCode}</li>
                    <li>Ngày: ${item.tour.date.getDate()}/${item.tour.date.getMonth()}/${item.tour.date.getFullYear()}</li>
                    <li>Số lượng vé: ${item.tickets.length}</li>
                    <li>Số tiền hoàn lại: ${refundAmount}</li>
                    <li>Số tài khoản: ${user._id}</li>
                </ul>
                
                <p>Trân trọng,<br>Đội ngũ quản lý du lịch.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Cancellation email sent');
    } catch (error) {
        console.error('Error sending cancellation email:', error);
    }
};



module.exports = { sendVerificationEmail, sendConfirmationEmail, sendCancellationEmail };
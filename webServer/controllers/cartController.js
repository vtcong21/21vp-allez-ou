const Items = require('../models/item');
const User = require('../models/user');

const getCartPage = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy id của người dùng từ thông tin đăng nhập

        // Tìm người dùng trong cơ sở dữ liệu dựa trên userId
        const user = await User.findById(userId).populate('cart'); // Sử dụng populate để lấy thông tin về cart

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const cartItems = user.cart; // Danh sách các mục trong giỏ hàng của người dùng

        res.render('cartPage', { cartItems }); // Render trang giỏ hàng và truyền danh sách mục cartItems vào

    } catch (error) {
        console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = getCartPage;
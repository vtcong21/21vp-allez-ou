const User = require('../models/user');
const Tour = require('../models/tour'); 

const addNewItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { codeTour, price } = req.body;
        
        var user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const tour = await Tour.findById(codeTour);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        const cartItem = {
            tourCode: codeTour,
            tickets: [],
            totalPrice: price,
        };

        // Thêm item vào giỏ hàng của người dùng
        user = await User.findByIdAndUpdate(userId, {
            $push: { cart: cartItem }
        });

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCartPage = async (req, res) => {
    try {
        const userId = req.userId;

        // Nối những model có tham chiếu đến nhau => tạo thành path
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'tourCode',
                select: 'name date price'
            }
        });

        if (!user.cart) {
            return res.status(404).send('There are no products in the shopping cart');
        }

        const cartItems = user.cart.map(item => ({
            name: item.tourCode.name,
            date: item.tourCode.date,
            price: item.tourCode.price,
        }));

        res.render('cartPage', { cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    addNewCart,
    getCartPage,
};

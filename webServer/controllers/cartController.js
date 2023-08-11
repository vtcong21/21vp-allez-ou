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

const deleteItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra phtử trong cart có trùng id với id ban đầu ko
        const itemIndex = user.cart.findIndex(item => item._id.equals(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        user.cart.splice(itemIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderPage = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate({
            path: 'orders',
            populate: {
                path: 'tourCode',
                select: 'name date price'
            }
        });

        if (!user.orders || user.orders.length === 0) {
            return res.status(404).send('Order not found');
        }

        const orderItems = user.orders.map(order => ({
            name: order.tourCode.name,
            date: order.tourCode.date,
            price: order.tourCode.price,
            status: order.status
        }));

        res.render('orderPage', { orderItems });
    } catch (error) {
        console.error(error);
        res.status(500).send( 'Internal server error' );
    }
};

module.exports = {
    addNewItem,
    getCartPage,
    deleteItem,
    getOrderPage,
};

const User = require('../models/user');
const Tour = require('../models/tour'); 
const Item = require('../models/item'); 

function convertGenderToVietnamese(gender) {
    if (gender === "Male") {
        return "Nam";
    } else if (gender === "Female") {
        return "Nữ";
    } else {
        return gender;
    }
}
function changeDateToString(currentTime) {
    let day = currentTime.getDate();
    let month = currentTime.getMonth() + 1;
    let year = currentTime.getFullYear();
  
    if (day.toString().length === 1) {
      day = "0" + day.toString();
    }
    if (month.toString().length === 1) {
      month = "0" + month.toString();
    }
  
    return day + "/" + month + "/" + year;
}

const addNewItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { tourCode } = req.body;

        const tour = await Tour.findOne({ code: tourCode });
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        const cartItem = new Item({
            tourCode: tour.code,
            tickets: [],
            totalPrice: tour.price,
        });

        await cartItem.save();

        // Thêm item vào giỏ hàng của người dùng
        const user = await User.findByIdAndUpdate(userId, {
            $push: { cart: cartItem._id }
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

        const userCart = await User.findById(userId).populate('cart');
        if (!userCart) {
            return res.status(404).send('There are no products in the shopping cart');
        }

        let cartItems = await Promise.all(userCart.cart.map(async (item) => {
            let tour = await Tour.findOne({ code: item.tourCode });
            const formattedStartDate = changeDateToString(tour.date);
            tour = { ...tour.toObject(), date: formattedStartDate };

            return {
                imgURL: tour.cardImgUrl,
                code: item.tourCode,
                name: tour.name,
                date: tour.date,
                price: tour.price,
                itemId: item._id,
            };
        }));

        const user = req.user;
        res.render('cart', { user, cartItems, title: 'null' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const deleteItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;
        console.log(userId);
      
        const user = await User.findById(userId);

        // Tìm và loại bỏ phần tử có _id trùng với itemId
        user.cart = user.cart.filter(item => !item._id.equals(itemId));
        await user.save();
        res.status(200).json({ message: 'Item removed from cart successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderHistoryPage = async (req, res) => {
    try {
        const userId = req.userId;

        const userOrders = await User.findById(userId).populate('orders');
        if (!userOrders) {
            return res.status(404).send('There are no orders in the order history');
        }
        let orderItems = await Promise.all(userOrders.orders.map(async (item) => {
            let tour = await Tour.findOne({ code: item.tourCode });
            const formattedStartDate = changeDateToString(tour.date);
            tour = { ...tour.toObject(), date: formattedStartDate };

            return {
                status: item.status,
                code: item.tourCode,
                itemId: item._id,

                imgURL: tour.cardImgUrl,
                name: tour.name,
                date: tour.date,
                numOfTickets: item.tickets.length,
                totalPrice: item.totalPrice,
                startPlace: tour.startPlace.name,
            };
        }));

        const orderSuccess = orderItems.filter(order => order.status === 'Success');
        const orderCompleted = orderItems.filter(order => order.status === 'Completed');
        const orderCancelled = orderItems.filter(order => order.status === 'Cancelled');

        const user = req.user;
        res.render('orderHistory', { user, orderSuccess, orderCompleted, orderCancelled, title: 'null' });

    } catch (error) {
        console.error(error);
        res.status(500).send( 'Internal server error' );
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.params;


        const itemIndex = user.cart.findIndex(item => item._id.equals(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const codeItem = await Tour.findOne({ code });
        if (!tour) {
          return res.status(404).json({ message: 'Tour not found' });
        }
        console.log(tour);
        res.status(200).json(tour);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

// const cancelOrder = async (req, res) => {

// };

// const getTransactionPage = async (req, res) => {

// };

module.exports = {
    addNewItem,
    getCartPage,
    deleteItem,
    getOrderHistoryPage,
    getOrderDetails,
    // cancelOrder,
    // getTransactionPage,
};

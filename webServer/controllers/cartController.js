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
                name: tour.name,
                date: tour.date,
                price: tour.price,
            };
        }));


        let user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');

        if (user) {
          const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
          const formattedGender = convertGenderToVietnamese(user.gender);
          user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
          res.render('cart', { user, cartItems });
        } else {
          // Nếu không có user, render view EJS với dữ liệu user là null
          res.render('home', { user: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// const deleteItem = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { itemId } = req.body;

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Kiểm tra phtử trong cart có trùng id với id ban đầu ko
//         const itemIndex = user.cart.findIndex(item => item.tourCode.equals(itemId));
//         if (itemIndex === -1) {
//             return res.status(404).json({ message: 'Item not found in cart' });
//         }

//         user.cart.splice(itemIndex, 1);
//         await user.save();

//         res.status(200).json({ message: 'Item removed from cart successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const getOrderPage = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const user = await User.findById(userId).populate({
//             path: 'orders',
//             select: 'tickets totalPrice status',
//             populate: {
//                 path: 'tourCode',
//                 select: 'name date startPlace'
//             }
//         });

//         if (!user.orders || user.orders.length === 0) {
//             return res.status(404).send('Order not found');
//         }

//         const orderItems = user.orders.map(order => ({
//             name: order.tourCode.name,
//             date: order.tourCode.date,
//             startPlace: order.tourCode.startPlace,
//             totalPrice: order.totalPrice,
//             status: order.status,
//             numOfTickets: order.tickets.length,
//         }));

//         res.render('orderPage', { orderItems });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send( 'Internal server error' );
//     }
// };

// const getOrderDetails = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { itemId } = req.params;


//         const itemIndex = user.cart.findIndex(item => item._id.equals(itemId));
//         if (itemIndex === -1) {
//             return res.status(404).json({ message: 'Item not found in cart' });
//         }

//         const codeItem = await Tour.findOne({ code });
//         if (!tour) {
//           return res.status(404).json({ message: 'Tour not found' });
//         }
//         console.log(tour);
//         res.status(200).json(tour);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//       }
// };

// const cancelOrder = async (req, res) => {

// };

// const getTransactionPage = async (req, res) => {

// };

module.exports = {
    addNewItem,
    getCartPage,
    // deleteItem,
    // getOrderPage,
    // getOrderDetails,
    // cancelOrder,
    // getTransactionPage,
};

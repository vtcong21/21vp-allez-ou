const User = require('../models/user');


const getHomePage = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');

    if (user) {
      // Kiểm tra dateOfBirth có giá trị hợp lệ không
      if (user.dateOfBirth instanceof Date && !isNaN(user.dateOfBirth)) {
        // Chuyển đổi thành chuỗi ngày/tháng/năm
        const dateOfBirth = user.dateOfBirth.toISOString().slice(0, 10);
        // Render view EJS và truyền dữ liệu vào
        res.render('home', { 
          user: { 
            fullName: user.fullName,
            email: user.email,
            dateOfBirth,
            phoneNumber: user.phoneNumber,
            gender: user.gender
          }
        });
      } else {
        // Gán giá trị mặc định nếu dateOfBirth không hợp lệ
        const defaultDateOfBirth = '01/01/2000'; // Hoặc giá trị mặc định khác bạn muốn
        res.render('home', { user: { ...user, dateOfBirth: defaultDateOfBirth } });
      }
    } else {
      // Nếu không có user, render view EJS với dữ liệu user là null
<<<<<<< HEAD:controllers/homeController.js
      res.render('dangkytour', { user: null });
=======
      res.render('home', { user: null });
>>>>>>> fda9fe5a21114d862808eaf9351c85128adfc30a:webServer/controllers/homeController.js
    }
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { getHomePage };
  
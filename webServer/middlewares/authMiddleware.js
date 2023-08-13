const jwt = require('jsonwebtoken');
const User =require('../models/user');

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
  var day = currentTime.getDate();
  var month = currentTime.getMonth() + 1;
  var year = currentTime.getFullYear();

  if (day.toString().length === 1) {
    day = "0" + day.toString();
  }
  if (month.toString().length === 1) {
    month = "0" + month.toString();
  }

  return day + "/" + month + "/" + year;
}
const authenticateToken = async (req, res, next) => {
  //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const token = req.cookies.token;
  if (!token) {
    //res.clearCookie('token');
    return next();
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decodedToken);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    // //---Truyền hẳn user vào luôn
    // let user = null;
    // user = await User.findById(decodedToken.userId).select('fullName email dateOfBirth phoneNumber gender').exec();
    // // Xử lí thông tin user ở đây
    // if (user) {
    //   const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
    //   const formattedGender = convertGenderToVietnamese(user.gender);
    //   user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
    // }
    // req.user = user;
    // //----------------------------------------
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const requireAdminRole = (req, res, next) => {
  const token = req.cookies.token;
  //console.log(token);
  if (!token) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Please log in' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decodedToken);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    if (req.userRole !== true) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }

}


module.exports = { authenticateToken, requireAdminRole };

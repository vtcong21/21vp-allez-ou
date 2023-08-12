const User = require('../models/user');

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
const getHomePage = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');

    if (user) {
      const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
      const formattedGender = convertGenderToVietnamese(user.gender);
      user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
      res.render('home', { user })
    } else {
      // Nếu không có user, render view EJS với dữ liệu user là null
      res.render('home', { user: null });
    }
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { getHomePage };
  
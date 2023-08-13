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
    const user = req.user;
    res.render('home', {user});
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { getHomePage };
  
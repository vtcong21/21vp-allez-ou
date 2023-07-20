const User = require('../models/user');

const getHomePage = async (req, res) => {
  try {
   
    if (req.userId && req.userRole) {
      const user = await User.findById(req.userId).select('fullName email dateOfBirth');
      res.render('home', { user });
    } else {
      res.render('home');
    }
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getHomePage };
  
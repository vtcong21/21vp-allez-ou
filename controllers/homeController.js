const User = require('../models/user');

const getHomePage = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('fullName email dateOfBirth');
    console.log(user);
    res.render('home', { user });
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getHomePage };
  
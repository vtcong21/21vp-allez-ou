const User = require('../models/user');

const getHomePage = async (req, res) => {
  try {
    const user = req.user;
    res.render('home', {user, title:'home'});
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { getHomePage };
  
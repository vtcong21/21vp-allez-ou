const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mailController = require('../controllers/mailController');
const path = require('path');

const renderRegister = (req,res) => {  
    res.render('dangky'); 
} 
 
module.exports = { 
    renderRegister
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mailController = require('../controllers/mailController');
const path = require('path');


const renderRegisterPage = (req, res) => {
  res.render('register');
}

const register = async (req, res) => {
  try {
    const { fullName, email, password, gender, dateOfBirth, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    const verificationCodeExpiration = new Date(Date.now() + 2 * 60 * 1000);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phoneNumber,
      verificationCode,
      verificationCodeExpiration
    });
    await user.save();
    await mailController.sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: "Registration successful", email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verify = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (verificationCode !== user.verificationCode) {
      if (user.verificationCodeExpiration < new Date()) {
        //await User.deleteOne({ email });
        return res.status(400).json({ message: 'Incorrect verification code (expired)' });
      }

      return res.status(400).json({ message: 'Incorrect verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiration = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id, userRole: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '72h' });
    res.cookie('token', token);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    if (user.verificationCodeExpiration >= new Date()) {
      return res.status(400).json({ message: 'Verification code is still valid' });
    }

    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    const verificationCodeExpiration = new Date(Date.now() + 2 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.verificationCodeExpiration = verificationCodeExpiration;
    await user.save();

    await mailController.sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'New verification code sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// const renderLoginPage = (req, res) => {
//   res.render('login');
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, userRole: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '72h' });
    // console.log('Token sent');
    res.cookie('token', token);
    
    
    if (user.isAdmin === true) {
      res.status(200).json({ redirectUrl: '/admin' });
    } else {
      res.status(200).json({ redirectUrl: '/' });
    }

    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
}

const checkPassword = async (req, res) => {
  try {
    const { userId, password } = req.body; 
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json({ message: 'Password is correct' });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error checking password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  renderRegisterPage,
  register,
  verify,
  resendVerificationCode,
  login,
  logout,
  checkPassword
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mailController = require('../controllers/mailController');


const renderRegisterPage = (req, res) =>{
  res.render('register');
}

const register = async (req, res) => {
  try {
    const { fullName, email, password, gender, dateOfBirth, phoneNumber} = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phoneNumber,
      verificationCode
    });
    await user.save();
    await mailController.sendVerificationEmail(email, verificationCode);

    res.render('verify', { email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verify = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    
    const user = await User.findOne(
      { email }
    );
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (verificationCode !== user.verificationCode) {
      await User.deleteOne({ email });
      return res.status(400).json({ message: 'Incorrect verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    //res.status(200).json({ message: "User verified successfully" });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const renderLoginPage = (req, res) => {
  res.render('login');
};

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

    const token = jwt.sign({ userId: user._id , userRole: user.isAdmin}, process.env.SECRET_KEY, { expiresIn: '24h' });
    console.log('Token sent');
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  renderLoginPage,
  renderRegisterPage,
  register,
  verify,
  login
};
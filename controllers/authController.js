const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { fullName, email, password, gender, dateOfBirth, phoneNumber, bankName, accountNumber, accountHolderName} = req.body;


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
      bankName,
      accountNumber,
      accountHolderName,
      verificationCode
    });
    await user.save();

    // Send email with verification code
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verify = async (req, res) => {
  try {
    const { email } = req.body;

    // Update user's status to verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true, verificationCode: null },
      { new: true }
    );

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  verify
};
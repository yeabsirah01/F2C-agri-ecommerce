const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  AuthenticationError,
} = require("../errors");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { email, firstName } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) throw new BadRequestError("User already exists");

  // Create the user with the provided details
  user = await User.create({ ...req.body });

  // Generate a verification token (You may use a library like uuid)

  const verificationToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const emailToken = `http://localhost:5000/api/v1/users/confirmation/${verificationToken}`;

  console.log(user._id);
  // Send the verification email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ethiosew1@gmail.com",
      pass: process.env.GMAIL_PASSWORDD,
    },
  });

  const mailOptions = {
    from: "ethiosew1@gmail.com",
    to: email,
    subject: "Waitlist Approval Notification",
    text: `Dear ${firstName}, please click the following link to verify your account: ${emailToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      // Handle the error appropriately
    } else {
      console.log("Email sent:", info.response);
      // Handle the success appropriately
    }
  });

  const { _id: id } = user;
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    id,
    token,
    firstName,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("User doesn't exist");
  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect) throw new AuthenticationError("Incorrect password");
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ ...user.toObject(), token, password: undefined });
};

module.exports = { register, login };

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
      user: "moferecommerce@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "moferecommerce@gmail.com",
    to: email,
    subject: "Verify Your Email",
    html: `
      <html>
        <head>
          <style>
            /* Add your custom styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              padding: 20px;
            }
  
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 30px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
  
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
  
            .logo img {
              width: 150px;
            }
  
            .message {
              margin-bottom: 20px;
            }
  
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 3px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="../../..client/src/assets/final logo green.png" alt="Company Logo" />
            </div>
            <div class="message">
              <p>Dear ${firstName},</p>
              <p>Please click the following link to verify your account:</p>
            </div>
            <div class="button">
              <a href="${emailToken}" style="color: #fff; text-decoration: none;">Verify Account</a>
            </div>
          </div>
        </body>
      </html>
    `,
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

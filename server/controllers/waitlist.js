const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { AuthenticationError } = require("../errors");
const dotenv = require("dotenv").config();

const multer = require("multer");

// console.log(process.env.PORT);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const addToWaitlist = async (req, res) => {
  console.log(req.files);
  const user = await User.findById(req.user.id);
  if (user.role !== "Consumer")
    throw new AuthenticationError(
      "You need a Consumer account to do this action"
    );
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "farmingLicense", maxCount: 1 },
    { name: "nationalIDPhoto", maxCount: 1 },
    { name: "farmSamplePhoto", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const data = {
        letter: req.body.letter,
        profilePicture: req.files.profilePicture[0].filename,
        farmingLicense: req.files.farmingLicense[0].filename,
        nationalIDPhoto: req.files.nationalIDPhoto[0].filename,
        farmSamplePhoto: req.files.farmSamplePhoto[0].filename,
        createdBy: req.user.id,
      };
      const waitlist = await Waitlist.create({
        user: req.user.id,
        ...data,
        createdBy: req.user.id,
      });
      await waitlist.populate("user");
      res.status(StatusCodes.CREATED).json(waitlist);
    }
  });
};

const getWaitlist = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate("user");
    await res.send(waitlist);
    // console.log(waitlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatewaitlist = async (req, res) => {
  console.log(process.env.GMAIL_PASSWORD);
  try {
    const waitlist = await Waitlist.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user");

    if (waitlist.status === "approved") {
      await User.findByIdAndUpdate(
        waitlist.user.id,
        { role: "Farmer" },
        { new: true }
      );

      // Delete the waitlist entry after 2 seconds

      // Send email notification to the user
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "moferecommerce@gmail.com",
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "moferecommerce@gmail.com",
        to: waitlist.user.email,
        subject: "Waitlist Approval Notification",
        html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Farmer Account Approval Notification</title>
    <style>
      /* Email styles */
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      table {
        border-collapse: collapse;
        margin: 20px auto;
        width: 90%;
        max-width: 600px;
        background-color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      }
      th, td {
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #4CAF50;
        color: #fff;
      }
      h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
      }
      a {
        color: #4CAF50;
        text-decoration: none;
      }
      img {
        display: block;
        margin: 0 auto;
      }

      /* Custom styles */
      .hero {
        background-color: #4CAF50;
        color: #fff;
        text-align: center;
        padding: 50px 0;
      }
      .hero h1 {
        font-size: 32px;
        margin-bottom: 20px;
      }
      .btn {
        display: inline-block;
        background-color: #4CAF50;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        margin-top: 30px;
      }
      .btn:hover {
        background-color: #388e3c;
      }
      .logo {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
      }
      .agri-image {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
      }
      h2 {
        color: #4CAF50;
        font-size: 24px;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 20px;
      }
      p {
        color: #555;
        font-size: 18px;
        text-align: center;
        margin: 20px 0;
      }
      .highlight {
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th colspan="2"><img src="../../..client/src/assets/final logo green.png" alt="Company Logo" /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img class="agri-image" src="https://example.com/agriculture.jpg" alt="Agriculture Image"></td>
        </tr>
        <tr>
          <td><h2>Congratulations, ${waitlist.user.firstName}!</h2></td>
        </tr>
        <tr>
          <td><p>Your request to become a farmer has been approved by our team. You are now a member of our farming community!</p></td>
        </tr>
        <tr>
          <td><p>As a farmer, you will have access to a wide range of high-quality agricultural products that will help you grow your business. We look forward to working with you and wish you all the best in your farming journey.</p></td>
        </tr>
        <tr>
          <td><p>If you have any questions or concerns, please don't hesitate to contact us at support@example.com.</p></td>
        </tr>
      </tbody>
    </table>
    <div class="hero">
      <h1>Thanks for choosing us for your farming needs!</h1>
      <p>Check out our <span class="highlight">latest products</span> and start growing your business today.</p>
      <a href="#" class="btn">Shop Now</a>
    </div>
  </body>
</html>
        `,
      };
      // ---------------------------------------------------------------------------------------------

      // -------------------------------------
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } else if (waitlist.status === "rejected") {
      // Send email notification to the user
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "moferecommerce@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "moferecommerce@gmail.com",
        to: waitlist.user.email,
        subject: "Waitlist Rejection Notification",
        text: `Dear ${waitlist.user.name}, We regret to inform you that your waitlist request has been rejected. `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    setTimeout(async () => {
      await Waitlist.findByIdAndDelete(waitlist._id);
      console.log("Waitlist entry deleted after 2 seconds.");
    }, 2000);

    res.send(waitlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { addToWaitlist, getWaitlist, updatewaitlist };

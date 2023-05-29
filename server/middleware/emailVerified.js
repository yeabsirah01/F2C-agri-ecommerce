const User = require("../models/User"); // Assuming you have a User model in your app

const emailVerified = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have the user ID in the request object
    if (
      user.role === "Admin" ||
      user.role === "CustomerSupport" ||
      user.role === "Transporter"
    ) {
      return next(); // pass middleware for admin users
    }
    if (!user.isVerified) {
      return res.status(428).send("Your email is not verified.");
    }

    req.user = user; // Attach the user object to the request object for later use
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = emailVerified;

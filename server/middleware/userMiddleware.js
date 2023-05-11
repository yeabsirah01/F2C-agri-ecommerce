const User = require("../models/User"); // Assuming you have a User model in your app

const userMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have the user ID in the request object
    if (!user.isActive) {
      return res
        .status(403)
        .send(
          "Your account has been disabled. Please contact customer support for assistance."
        );
    }
    req.user = user; // Attach the user object to the request object for later use
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = userMiddleware;

const User = require("../models/User");
const checkSubscription = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscription.status === "expired") {
      return res
        .status(402)
        .json({ message: "You need to subscribe to access this feature" });
    }

    if (user.subscription.endDate < new Date()) {
      user.subscription.status = "expired";
      user.subscription.startDate = null;
      user.subscription.endDate = null;
      await user.save();
      return res.status(402).json({
        message:
          "Your subscription has expired. Please renew your subscription to access this feature",
      });
    }

    req.user.subscription = user.subscription;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while checking subscription. Please try again later.",
    });
  }
};

module.exports = checkSubscription;

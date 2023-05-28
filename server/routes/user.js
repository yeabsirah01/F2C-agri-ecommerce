const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  disableUser,
  confirmation,
} = require("../controllers/user");
const emailVerified = require("../middleware/emailVerified");
const userMiddleware = require("../middleware/userMiddleware");
const router = express.Router();
const authorizationMiddleware = require("./../middleware/authorization");

router.route("/").get(authorizationMiddleware, userMiddleware, getAllUsers);
router.route("/confirmation/:token").get(confirmation);
router.route("/disable/:id").put(authorizationMiddleware, disableUser);
router
  .route("/:id")
  .get(authorizationMiddleware, emailVerified, getUser)
  .put(authorizationMiddleware, emailVerified, updateUser);

module.exports = router;

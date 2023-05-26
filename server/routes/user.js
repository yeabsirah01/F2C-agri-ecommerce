const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  disableUser,
} = require("../controllers/user");
const userMiddleware = require("../middleware/userMiddleware");
const router = express.Router();
const authorizationMiddleware = require("./../middleware/authorization");

router.route("/").get(userMiddleware, getAllUsers);
router.route("/disable/:id").put(disableUser);
router.route("/:id").get(getUser).put(updateUser);

module.exports = router;

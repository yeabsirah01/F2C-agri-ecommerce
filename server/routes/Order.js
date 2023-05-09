const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrder,
  getOrders,
  getMyOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

// Create a new order

router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

//this is for consumer
router.get("/myorders", getMyOrders);

// thsi is for farmer
router.get("/orders", getOrders);

// Get order by ID
router.get("/:id", getOrder);

// Update order by ID
router.patch("/:id", updateOrder);

// Delete order by ID
router.delete("/:id", deleteOrder);

module.exports = router;

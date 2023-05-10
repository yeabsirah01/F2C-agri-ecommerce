const mongoose = require("mongoose");
const crypto = require("crypto");
const Order = require("../models/Order");

function generateOrderNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "MOFER-";
  for (let i = 0; i < 8; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

const createOrder = async (req, res) => {
  try {
    const orderNumber = generateOrderNumber();
    const orderData = {
      ...req.body,
      buyerInfo: req.user.id,
      orderNumber: orderNumber,
    };
    const order = new Order(orderData);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error creating order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMyOrders = async (req, res) => {
  //   console.log(req.user.id);
  try {
    const userId = req.user.id; // assuming the user ID is stored in the _id field of the user object
    const buyerId = mongoose.Types.ObjectId(userId);
    const orders = await Order.find({
      buyerInfo: buyerId,
    });
    res.json(orders);
    // console.log(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // assuming the user ID is stored in the _id field of the user object
    const sellerId = mongoose.Types.ObjectId(userId);
    const orders = await Order.find({
      sellerInfo: sellerId,
    });
    res.json(orders);
    console.log(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateOrder = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["shippingDetails", "paymentInfo"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }

    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  getOrders,
  getMyOrders,
  updateOrder,
  deleteOrder,
};

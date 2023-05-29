const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  sellerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippingDetails: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    ticketNumber: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ["pending", "deliveredpartially", "delivered", "undelivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  productsTotalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

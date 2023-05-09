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
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

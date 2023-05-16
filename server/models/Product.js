const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "ፍራፍሬዎች",
        "አትክልቶች",
        "ጥራጥሬ",
        "እህል",
        "ቅመም",
        "ቡና",
        "የእንስሳት ተዋዕፆ",
        "እንስሳት",
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      value: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: ["KG", "Lt", "Piece"],
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    reviews: {
      type: [
        {
          count: Number,
          text: String,
          createdBy: {
            id: mongoose.Types.ObjectId,
            name: String,
          },
        },
      ],
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

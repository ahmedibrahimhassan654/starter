const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  deleveredArea: {
    type: String,
    required: [true, "deleveredArea name must be provided"],
  },
  productName: {
    type: String,
    required: [true, "product Name must be provided"],
  },
  quantity: {
    type: Number,
    required: [true, "product quantity must be provided"],
  },
  brand: {
    type: Number,
    required: [true, "product brand must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);

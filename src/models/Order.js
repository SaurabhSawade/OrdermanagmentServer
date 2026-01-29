const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  },
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      address: String,
      phone: String,
      email: String
    },
    items: [orderItemSchema],
    totalAmount: Number,
    status: {
      type: String,
      default: "pending"
    },
    orderNumber: {
      type: String,
      unique: true
    },
    estimatedDelivery: Date,
    specialInstructions: String
  },
  { timestamps: true }
);

/* ✅ MONGOOSE 7 SAFE PRE HOOK */
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    this.orderNumber =
      "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }
});

module.exports = mongoose.model("Order", orderSchema);
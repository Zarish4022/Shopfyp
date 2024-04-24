const mongoose = require("mongoose");
//for the User data
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      //ther more than 1 product so here its array using
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

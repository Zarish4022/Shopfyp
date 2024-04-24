const mongoose = require("mongoose");
//for the User data
const OrderSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }, //we take address type as object coz here we have to fill info in line by line
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

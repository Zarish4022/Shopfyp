const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyTokenAuthorization, async (req, res) => {
  const { userId, products, totalAmount, status } = req.body;
  console.log("Order: ", totalAmount);
  try {
    // Create a new order document
    const order = new Order({
      userId,
      products,
      totalAmount,
      status,
    });
    // Save the order to MongoDB
    const savedOrder = await order.save();
    res.status(201).json({ orderId: savedOrder._id });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/", async (req, res) => {
//   const newOrder = new Order(req.body);
//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET User order
router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL  ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;

  const date = new Date(); //exmape its sep month
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); ///and its august
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); ///its gonna be first july

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } }, //its a condition
          }),
        },
      }, //gte meanes greter than
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET Monthly sales
router.get("/sales", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); // Example: it's September
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // and it's August
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // it's going to be July

  try {
    const sales = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Monthly costs
router.get("/costs", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); // Example: it's September
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // and it's August
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // it's going to be July

  try {
    const costs = await Expense.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          cost: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$cost" },
        },
      },
    ]);
    res.status(200).json(costs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

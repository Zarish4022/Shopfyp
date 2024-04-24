const express = require("express"); // for express package
const app = express(); //for app
const cors = require("cors");
const mongoose = require("mongoose"); // for mongoose
const dotenv = require("dotenv"); // for the usage of env file'
const userRoute = require("./routes/user"); //importing usr route files here
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const stripeRoute = require("./routes/stripe");
app.use(express.json());
dotenv.config(); //for configuration of env file

//use cors middleware
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("successful"))
  .catch((err) => console.log(err)); //mongoo connnection db link where chnge username an ddb name as well

app.use("/api/users", userRoute); //this for whenever api/user is used it used the userRoute file api's
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("backend running"); //function to set the port
});

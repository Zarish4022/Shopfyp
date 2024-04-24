const router = require("express").Router();
const User = require("../models/User"); //User from model User
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    //the body that user post i mean register
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), //to encrypt(hash)AES password we use crypto.js
  });
  //to save the user in db we use save method with try catch
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //req successful and next
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //findone method to find user and decrypt method to show pssword
    !user && res.status(401).json("USER NOT EXISTS");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("User Passwrod is incorrect");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC, //from env file
      { expiresIn: "3d" } //expires in 3 days
    );
    const { password, ...others } = user._doc; //this is bcz mongodb stored dat in doc folder
    //there two things so they treat like an object and use spread opeator to prevent others.data in hitting api
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

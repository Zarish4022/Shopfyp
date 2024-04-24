//import jsonwebtoken
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  // check if theres not authHeader
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      //verify function
      if (err) res.status(403).json("token not valid"); //if token is avaialbe but now it expires then this
      req.user = user; //assigning req to user
      //next use to leave the function move to other part
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};
const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};
module.exports = { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin };

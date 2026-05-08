const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decoded = jwt.verify(tokem, process.env.JWT_SECRET);

      //save user email to request
      req.userEmail = decoded.email;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided ",
    });
  }
};

module.exports = protect;

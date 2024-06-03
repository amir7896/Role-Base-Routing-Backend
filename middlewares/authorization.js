const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res
          .status(401)
          .json({ success: false, message: "Un Authorized Access" });
      }
      let token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token not found" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden - Access denied" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = authMiddleware;

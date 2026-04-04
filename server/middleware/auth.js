// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendError } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return sendError(res, 401, "Unauthorized: User not found");

    req.user = user;
    next();
  } catch (err) {
    return sendError(res, 401, "Unauthorized: Invalid or expired token");
  }
};

module.exports = { authenticate };
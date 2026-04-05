// server/modules/auth/auth.controller.js
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { sendSuccess, sendError } = require("../../utils/response");
const { JWT_EXPIRES_IN } = require("../../constants");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// server/modules/auth/auth.controller.js
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return sendError(res, 400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 409, "Email already registered");

    const user = await User.create({ firstName, lastName, email, password });
    const token = generateToken(user._id);

    return sendSuccess(res, 201, { token, user: user.toPublicJSON() }, "Registration successful");
  } catch (err) {
    console.error("Register error:", err); 
    return sendError(res, 500, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return sendError(res, 400, "Email and password are required");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 401, "Invalid credentials");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return sendError(res, 401, "Invalid credentials");

    const token = generateToken(user._id);

    return sendSuccess(res, 200, { token, user: user.toPublicJSON() }, "Login successful");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const getMe = async (req, res) => {
  return sendSuccess(res, 200, { user: req.user.toPublicJSON() });
};

const googleAuth = async (req, res) => {
  try {
    const { firstName, lastName, email, googleId } = req.body;

    if (!email || !googleId) return sendError(res, 400, "Invalid Google credentials");

    let user = await User.findOne({ email });

    if (!user) {
      
      user = new User({
        firstName,
        lastName,
        email,
        password: googleId, 
      });
      await user.save();
    }

    const token = generateToken(user._id);
    return sendSuccess(res, 200, { token, user: user.toPublicJSON() }, "Google login successful");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = { register, login, getMe, googleAuth };
// server/modules/auth/auth.routes.js
const express = require("express");
const { register, login, getMe, googleAuth } = require("./auth.controller");
const { authenticate } = require("../../middleware/auth");

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log("Register route hit");
  console.log("Body:", req.body);
  next();
}, register);

router.post("/login",    login);
router.get("/me",        authenticate, getMe);
router.post("/google",   googleAuth);

module.exports = router;
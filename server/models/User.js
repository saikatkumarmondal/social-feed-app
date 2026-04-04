// server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { SALT_ROUNDS } = require("../constants");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, minlength: 6 },
    avatar:    { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  return {
    _id:       this._id,
    firstName: this.firstName,
    lastName:  this.lastName,
    email:     this.email,
    avatar:    this.avatar,
  };
};

module.exports = mongoose.model("User", userSchema);
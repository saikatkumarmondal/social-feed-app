// server/models/Comment.js
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    author:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text:    { type: String, required: true, trim: true },
    likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    post:    { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text:    { type: String, required: true, trim: true },
    likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [replySchema],
  },
  { timestamps: true }
);

commentSchema.index({ post: 1, createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);
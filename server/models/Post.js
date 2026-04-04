// server/models/Post.js
const mongoose = require("mongoose");
const { POST_VISIBILITY } = require("../constants");

const postSchema = new mongoose.Schema(
  {
    author:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text:       { type: String, trim: true, default: "" },
    image:      { type: String, default: "" },
    visibility: { type: String, enum: Object.values(POST_VISIBILITY), default: POST_VISIBILITY.PUBLIC },
    likes:      [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1, visibility: 1 });

module.exports = mongoose.model("Post", postSchema);
// server/modules/post/post.routes.js
const express = require("express");
const multer  = require("multer");
const path    = require("path");
const { authenticate } = require("../../middleware/auth");
const { createPost, getFeedPosts, togglePostLike, deletePost } = require("./post.controller");
const { MAX_IMAGE_SIZE_MB } = require("../../constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    isValid ? cb(null, true) : cb(new Error("Only image files are allowed"));
  },
});

const router = express.Router();

router.get("/",                    authenticate, getFeedPosts);
router.post("/",                   authenticate, upload.single("image"), createPost);
router.patch("/:postId/like",      authenticate, togglePostLike);
router.delete("/:postId",          authenticate, deletePost);

module.exports = router;

///http://localhost:5000/api/posts/69d0b713914c278dfab9889a/comments/69d0b92e914c278dfab9889bntId/replies/69d0b2c5914c278dfab98898/like
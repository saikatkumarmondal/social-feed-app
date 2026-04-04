// server/modules/comment/comment.routes.js
const express = require("express");
const { authenticate } = require("../../middleware/auth");
const {
  addComment, getPostComments, toggleCommentLike, addReply, toggleReplyLike,
} = require("./comment.controller");

const router = express.Router({ mergeParams: true });

router.get("/",                                    authenticate, getPostComments);
router.post("/",                                   authenticate, addComment);
router.patch("/:commentId/like",                   authenticate, toggleCommentLike);
router.post("/:commentId/replies",                 authenticate, addReply);
router.patch("/:commentId/replies/:replyId/like",  authenticate, toggleReplyLike);

module.exports = router;
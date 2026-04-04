// server/modules/comment/comment.controller.js
const Comment = require("../../models/Comment");
const Post    = require("../../models/Post");
const { sendSuccess, sendError } = require("../../utils/response");

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return sendError(res, 400, "Comment text is required");

    const post = await Post.findById(req.params.postId);
    if (!post) return sendError(res, 404, "Post not found");

    const comment = await Comment.create({
      post:   req.params.postId,
      author: req.user._id,
      text,
    });

    await comment.populate("author", "firstName lastName avatar");
    return sendSuccess(res, 201, { comment }, "Comment added");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName avatar")
      .populate("likes", "firstName lastName avatar")
      .populate("replies.author", "firstName lastName avatar")
      .populate("replies.likes", "firstName lastName avatar")
      .lean();

    return sendSuccess(res, 200, { comments });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return sendError(res, 404, "Comment not found");

    const alreadyLiked = comment.likes.includes(req.user._id);
    alreadyLiked ? comment.likes.pull(req.user._id) : comment.likes.push(req.user._id);

    await comment.save();
    await comment.populate("likes", "firstName lastName avatar");

    return sendSuccess(res, 200, { likes: comment.likes, isLiked: !alreadyLiked });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const addReply = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return sendError(res, 400, "Reply text is required");

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return sendError(res, 404, "Comment not found");

    comment.replies.push({ author: req.user._id, text });
    await comment.save();
    await comment.populate("replies.author", "firstName lastName avatar");

    const newReply = comment.replies[comment.replies.length - 1];
    return sendSuccess(res, 201, { reply: newReply }, "Reply added");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const toggleReplyLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return sendError(res, 404, "Comment not found");

    const reply = comment.replies.id(req.params.replyId);
    if (!reply) return sendError(res, 404, "Reply not found");

    const alreadyLiked = reply.likes.includes(req.user._id);
    alreadyLiked ? reply.likes.pull(req.user._id) : reply.likes.push(req.user._id);

    await comment.save();
    await comment.populate("replies.likes", "firstName lastName avatar");

    return sendSuccess(res, 200, { likes: reply.likes, isLiked: !alreadyLiked });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = { addComment, getPostComments, toggleCommentLike, addReply, toggleReplyLike };
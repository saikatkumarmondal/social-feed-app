// server/modules/post/post.controller.js
const Post = require("../../models/Post");
const { sendSuccess, sendError } = require("../../utils/response");
const { DEFAULT_PAGE_SIZE, POST_VISIBILITY } = require("../../constants");

const createPost = async (req, res) => {
  try {
    const { text, visibility } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!text && !image) return sendError(res, 400, "Post must have text or image");

    const post = await Post.create({
      author: req.user._id,
      text,
      image,
      visibility: visibility || POST_VISIBILITY.PUBLIC,
    });

    await post.populate("author", "firstName lastName avatar");
    return sendSuccess(res, 201, { post }, "Post created");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;
    const skip  = (page - 1) * limit;

    const visibilityFilter = {
      $or: [
        { visibility: POST_VISIBILITY.PUBLIC },
        { visibility: POST_VISIBILITY.PRIVATE, author: req.user._id },
      ],
    };

    const [posts, total] = await Promise.all([
      Post.find(visibilityFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "firstName lastName avatar")
        .populate("likes", "firstName lastName avatar")
        .lean(),
      Post.countDocuments(visibilityFilter),
    ]);

    return sendSuccess(res, 200, {
      posts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const togglePostLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return sendError(res, 404, "Post not found");

    const isPrivateAndNotOwner =
      post.visibility === POST_VISIBILITY.PRIVATE &&
      post.author.toString() !== req.user._id.toString();

    if (isPrivateAndNotOwner) return sendError(res, 403, "Forbidden");

    const alreadyLiked = post.likes.includes(req.user._id);
    if (alreadyLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    await post.populate("likes", "firstName lastName avatar");

    return sendSuccess(res, 200, { likes: post.likes, isLiked: !alreadyLiked });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return sendError(res, 404, "Post not found");
    if (post.author.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "Forbidden: Not your post");
    }

    await post.deleteOne();
    return sendSuccess(res, 200, {}, "Post deleted");
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

module.exports = { createPost, getFeedPosts, togglePostLike, deletePost };
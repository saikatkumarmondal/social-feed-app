// src/components/PostCard.jsx
import React, { useState, useCallback } from "react";
import {
  FiMoreVertical, FiMessageCircle, FiShare2,
  FiThumbsUp, FiHeart, FiSmile, FiMic, FiImage,
  FiTrash2, FiLock, FiGlobe,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import {
  togglePostLike, fetchPostComments, addComment,
  toggleCommentLike, addReply, toggleReplyLike, deletePost,
} from "../services/api";

const SERVER_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const getAvatarUrl = (user) =>
  user?.avatar
    ? `${SERVER_URL}${user.avatar}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}+${user?.lastName}`;

const formatTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ─── Reply Item ───────────────────────────────────────────────────────────────
const ReplyItem = ({ reply, postId, commentId, currentUser, onReplyLikeToggled }) => {
  const isLiked = reply.likes?.some((u) => u._id === currentUser?._id);

  const handleLike = async () => {
    try {
      const res = await toggleReplyLike(postId, commentId, reply._id);
      onReplyLikeToggled(reply._id, res.data.likes);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="mt-3 flex items-center gap-2 ml-10">
      <img src={getAvatarUrl(reply.author)} className="w-6 h-6 rounded-full object-cover" alt="Me" />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-3 py-1.5 inline-block max-w-full">
          <h4 className="font-bold text-[12px] text-gray-900">{reply.author?.firstName} {reply.author?.lastName}</h4>
          <p className="text-gray-700 leading-snug mt-0.5 text-[12px]">{reply.text}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1 ml-2">
          {reply.likes?.length > 0 && (
            <div className="flex items-center bg-white shadow-sm border border-gray-100 rounded-full px-1 py-0.5">
              <FiThumbsUp size={10} className="text-blue-500 fill-blue-500" />
              <span className="text-[10px] text-gray-500 ml-1 font-medium">{reply.likes.length}</span>
            </div>
          )}
          <div className="flex gap-3 text-[11px] font-bold text-gray-500 ml-2">
            <button onClick={handleLike} className={`hover:underline ${isLiked ? "text-blue-600" : ""}`}>
              {isLiked ? "Unlike" : "Like"}
            </button>
            <span className="font-normal text-gray-400">{formatTime(reply.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Comment Item ─────────────────────────────────────────────────────────────
const CommentItem = ({ comment, postId, currentUser, onCommentLikeToggled }) => {
  const [isReplying, setIsReplying]               = useState(false);
  const [replyText, setReplyText]                 = useState("");
  const [replies, setReplies]                     = useState(comment.replies || []);
  const [showReplies, setShowReplies]             = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const isLiked = comment.likes?.some((u) => u._id === currentUser?._id);

  const handleCommentLike = async () => {
    try {
      const res = await toggleCommentLike(postId, comment._id);
      onCommentLikeToggled(comment._id, res.data.likes);
    } catch (err) { console.error(err); }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    setIsSubmittingReply(true);
    try {
      const res = await addReply(postId, comment._id, replyText);
      setReplies((prev) => [...prev, res.data.reply]);
      setReplyText("");
      setIsReplying(false);
      setShowReplies(true);
    } catch (err) { console.error(err); }
    finally { setIsSubmittingReply(false); }
  };

  const handleReplyLikeToggled = (replyId, newLikes) =>
    setReplies((prev) => prev.map((r) => (r._id === replyId ? { ...r, likes: newLikes } : r)));

  return (
    <div className="flex gap-3">
      <img src={getAvatarUrl(comment.author)} className="w-8 h-8 rounded-full object-cover" alt="Commenter" />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-4 py-2 text-sm inline-block max-w-full">
          <h4 className="font-bold text-[12px] text-gray-900">{comment.author?.firstName} {comment.author?.lastName}</h4>
          <p className="text-gray-700 leading-snug mt-0.5">{comment.text}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1 ml-2">
          {comment.likes?.length > 0 && (
            <div className="flex items-center bg-white shadow-sm border border-gray-100 rounded-full px-1 py-0.5">
              <FiThumbsUp size={10} className="text-blue-500 fill-blue-500" />
              <FiHeart size={10} className="text-red-500 fill-red-500 ml-0.5" />
              <span className="text-[10px] text-gray-500 ml-1 font-medium">{comment.likes.length}</span>
            </div>
          )}
          <div className="flex gap-3 text-[11px] font-bold text-gray-500 ml-2">
            <button onClick={handleCommentLike} className={`hover:underline ${isLiked ? "text-blue-600" : ""}`}>
              {isLiked ? "Unlike" : "Like"}
            </button>
            <button onClick={() => setIsReplying(!isReplying)} className="hover:underline">Reply</button>
            <button className="hover:underline">Share</button>
            <span className="font-normal text-gray-400">{formatTime(comment.createdAt)}</span>
          </div>
        </div>

        {replies.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)} className="text-[11px] font-semibold text-blue-600 hover:underline mt-1 ml-2">
            {showReplies ? "Hide replies" : `View ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`}
          </button>
        )}

        {showReplies && replies.map((reply) => (
          <ReplyItem
            key={reply._id}
            reply={reply}
            postId={postId}
            commentId={comment._id}
            currentUser={currentUser}
            onReplyLikeToggled={handleReplyLikeToggled}
          />
        ))}

        {isReplying && (
          <div className="mt-3 flex items-center gap-2">
            <img src={getAvatarUrl(currentUser)} className="w-6 h-6 rounded-full object-cover" alt="Me" />
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                placeholder="Write a comment..."
                className="bg-transparent w-full outline-none text-[12px] text-gray-700"
              />
              <button
                onClick={handleReplySubmit}
                disabled={!replyText.trim() || isSubmittingReply}
                className="text-blue-600 font-bold text-[11px] disabled:opacity-40 flex-shrink-0"
              >
                {isSubmittingReply ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PostCard ─────────────────────────────────────────────────────────────────
const PostCard = ({ post, onPostDeleted }) => {
  const { currentUser } = useAuth();

  const [likes, setLikes]                             = useState(post.likes || []);
  const [comments, setComments]                       = useState([]);
  const [commentText, setCommentText]                 = useState("");
  const [isCommentsVisible, setIsCommentsVisible]     = useState(false);
  const [isLoadingComments, setIsLoadingComments]     = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showMenu, setShowMenu]                       = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm]     = useState(false); // ← নতুন

  const isLiked = likes.some((u) => u._id === currentUser?._id);
  const isOwner = post.author?._id === currentUser?._id;

  const handleLikeToggle = async () => {
    try { const res = await togglePostLike(post._id); setLikes(res.data.likes); }
    catch (err) { console.error(err); }
  };

  const handleToggleComments = useCallback(async () => {
    if (isCommentsVisible) { setIsCommentsVisible(false); return; }
    setIsLoadingComments(true);
    try {
      const res = await fetchPostComments(post._id);
      setComments(res.data.comments);
      setIsCommentsVisible(true);
    } catch (err) { console.error(err); }
    finally { setIsLoadingComments(false); }
  }, [isCommentsVisible, post._id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setIsSubmittingComment(true);
    try {
      const res = await addComment(post._id, commentText);
      setComments((prev) => [res.data.comment, ...prev]);
      setCommentText("");
      setIsCommentsVisible(true);
    } catch (err) { console.error(err); }
    finally { setIsSubmittingComment(false); }
  };

  const handleCommentLikeToggled = (commentId, newLikes) =>
    setComments((prev) => prev.map((c) => (c._id === commentId ? { ...c, likes: newLikes } : c)));

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      setShowDeleteConfirm(false);
      setShowMenu(false);
      onPostDeleted(post._id); // ← Feed থেকে সরিয়ে দেয়, বাকি posts ঠিক থাকে
    } catch (err) {
      console.error(err);
      setShowDeleteConfirm(false);
      setShowMenu(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img src={getAvatarUrl(post.author)} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-50" />
          <div>
            <h4 className="font-bold text-[14px] text-gray-800">{post.author?.firstName} {post.author?.lastName}</h4>
            <p className="text-[11px] text-gray-500 flex items-center gap-1">
              {formatTime(post.createdAt)} ·{" "}
              <span className="flex items-center gap-0.5 text-blue-500 font-medium">
                {post.visibility === "public" ? <FiGlobe size={10} /> : <FiLock size={10} />}
                <span className="capitalize">{post.visibility}</span>
              </span>
            </p>
          </div>
        </div>

        {/* 3-dot Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowMenu(!showMenu); setShowDeleteConfirm(false); }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <FiMoreVertical size={20} />
          </button>

          {/* Dropdown */}
          {showMenu && isOwner && !showDeleteConfirm && (
            <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-lg shadow-md py-1 z-10 min-w-[120px]">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
              >
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          )}

          {/* Confirm Dialog */}
          {showDeleteConfirm && (
            <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-10 w-[200px]">
              <p className="text-sm font-semibold text-gray-700 mb-3">Delete this post?</p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Text */}
      {post.text && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-700 leading-relaxed">{post.text}</p>
        </div>
      )}

      {/* Main Post Image */}
      {post.image && (
        <div className="w-full bg-gray-50">
          <img src={`${SERVER_URL}${post.image}`} alt="Post content" className="w-full h-auto max-h-[450px] object-contain mx-auto" />
        </div>
      )}

      {/* React Count & Stats */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <div className="flex -space-x-1.5">
            {likes.slice(0, 3).map((u) => (
              <img key={u._id} src={getAvatarUrl(u)} className="w-5 h-5 rounded-full border-2 border-white object-cover" alt="" />
            ))}
          </div>
          {likes.length > 0 && <span className="ml-2 text-[12px] text-gray-500 font-medium">{likes.length}</span>}
        </div>
        <div className="flex gap-3 text-[12px] text-gray-500">
          <span onClick={handleToggleComments} className="hover:underline cursor-pointer">
            {isLoadingComments ? "Loading..." : `${comments.length > 0 ? comments.length : ""} Comments`}
          </span>
          <span className="hover:underline cursor-pointer">122 Shares</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex justify-around border-t border-b border-gray-50 py-1.5 mx-4">
        <button
          onClick={handleLikeToggle}
          className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg transition-colors text-sm font-medium ${isLiked ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <FiSmile className={isLiked ? "text-blue-500" : "text-yellow-500"} size={18} />
          {isLiked ? "Liked" : "Haha"}
        </button>
        <button
          onClick={handleToggleComments}
          className="flex-1 flex justify-center items-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
        >
          <FiMessageCircle className="text-blue-500" size={18} />
          {isLoadingComments ? "Loading..." : "Comment"}
        </button>
        <button className="flex-1 flex justify-center items-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
          <FiShare2 className="text-green-500" size={18} /> Share
        </button>
      </div>

      {/* Comment Section Wrapper */}
      <div className="p-4 space-y-4">
        {/* Comment Input */}
        <div className="flex items-center gap-3">
          <img src={getAvatarUrl(currentUser)} className="w-8 h-8 rounded-full border border-gray-100 object-cover" alt="Me" />
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200/70 transition-colors">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
              placeholder="Write a comment..."
              className="bg-transparent flex-1 outline-none text-sm text-gray-700"
            />
            <div className="flex items-center gap-2 text-gray-400">
              <FiMic className="hover:text-gray-600 cursor-pointer" size={16} />
              <FiImage className="hover:text-gray-600 cursor-pointer" size={16} />
            </div>
          </div>
        </div>

        {/* View / Hide comments */}
        {!isCommentsVisible ? (
          <button onClick={handleToggleComments} className="text-sm font-semibold text-blue-600 hover:underline">
            View previous comments
          </button>
        ) : (
          <>
            {comments.length > 0 && (
              <button onClick={handleToggleComments} className="text-sm font-semibold text-blue-600 hover:underline">
                Hide comments
              </button>
            )}
            <div className="space-y-4">
              {comments.length === 0
                ? <p className="text-sm text-gray-400 text-center py-2">No comments yet.</p>
                : comments.map((comment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      currentUser={currentUser}
                      onCommentLikeToggled={handleCommentLikeToggled}
                    />
                  ))
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
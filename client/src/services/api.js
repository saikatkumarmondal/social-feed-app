const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const getAuthHeadersMultipart = () => {
  const token = localStorage.getItem("token");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Auth
export const registerUser = (payload) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const loginUser = (payload) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const fetchCurrentUser = () =>
  fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);

// Posts
export const fetchFeedPosts = (page = 1) =>
  fetch(`${BASE_URL}/posts?page=${page}&limit=10`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const createPost = (formData) =>
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: getAuthHeadersMultipart(),
    body: formData,
  }).then(handleResponse);

export const togglePostLike = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const deletePost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);

// Comments
export const fetchPostComments = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}/comments`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const addComment = (postId, text) =>
  fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  }).then(handleResponse);

export const toggleCommentLike = (postId, commentId) =>
  fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}/like`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const addReply = (postId, commentId, text) =>
  fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}/replies`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  }).then(handleResponse);

export const toggleReplyLike = (postId, commentId, replyId) =>
  fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}/replies/${replyId}/like`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  }).then(handleResponse);
// server/utils/response.js
const sendSuccess = (res, statusCode = 200, data = {}, message = "Success") => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode = 500, message = "Internal Server Error") => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { sendSuccess, sendError };
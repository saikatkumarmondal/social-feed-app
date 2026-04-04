// server/constants/index.js
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;
const DEFAULT_PAGE_SIZE = 10;
const MAX_IMAGE_SIZE_MB = 5;
const POST_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

module.exports = {
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
  DEFAULT_PAGE_SIZE,
  MAX_IMAGE_SIZE_MB,
  POST_VISIBILITY,
};
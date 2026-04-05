// server/index.js
const express    = require("express");
const cors       = require("cors");
const path       = require("path");
require("dotenv/config");

const connectDB      = require("./config/db");
const authRoutes     = require("./modules/auth/auth.routes");
const postRoutes     = require("./modules/post/post.routes");
const commentRoutes  = require("./modules/comment/comment.routes");
const { errorHandler } = require("./middleware/errorHandler");

const app  = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173", // local development
  ],
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",              authRoutes);
app.use("/api/posts",             postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
# Social Feed App

A full-stack social media feed application where users can register, log in, create posts, and interact with others through likes, comments, and replies.

---

## Live Demo

- **Frontend:** coming soon
- **Backend API:** coming soon
- **Video Walkthrough:** [[coming soon](https://www.youtube.com/watch?v=jqRQWCdy26Y)](https://www.youtube.com/watch?v=jqRQWCdy26Y)

---

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | React.js (Vite), Tailwind CSS, React Router DOM |
| Backend  | Node.js, Express.js                             |
| Database | MongoDB (Atlas), Mongoose                       |
| Auth     | JWT (localStorage), Firebase (Google OAuth)     |
| Storage  | Local disk via Multer                           |

---

## Project Structure

```
social-feed-app/
├── client/                        # React frontend (Vite)
│   └── src/
│       ├── components/            # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── PostBox.jsx
│       │   ├── PostCard.jsx
│       │   ├── LeftSidebar.jsx
│       │   ├── RightSidebar.jsx
│       │   ├── SuggestedUserCard.jsx
│       │   └── FriendsSidebar.jsx
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state
│       ├── layout/
│       │   └── MainLayout.jsx     # Navbar wrapper layout
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Feed.jsx
│       ├── routes/
│       │   └── ProtectedRoute.jsx # Route guard
│       └── services/
│           └── api.js             # All API call functions
└── server/                        # Express backend
    ├── config/
    │   └── db.js                  # MongoDB connection
    ├── constants/
    │   └── index.js               # App-wide constants
    ├── middleware/
    │   ├── auth.js                # JWT verification
    │   └── errorHandler.js        # Global error handler
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    ├── modules/
    │   ├── auth/
    │   │   ├── auth.controller.js
    │   │   └── auth.routes.js
    │   ├── post/
    │   │   ├── post.controller.js
    │   │   └── post.routes.js
    │   └── comment/
    │       ├── comment.controller.js
    │       └── comment.routes.js
    ├── utils/
    │   └── response.js            # Unified API response helper
    └── index.js                   # Server entry point
```

---

## Features

### Authentication & Authorization
- Register with first name, last name, email, and password
- Login with email and password
- Google OAuth via Firebase (`signInWithRedirect`)
- JWT token stored in `localStorage`
- Protected route — Feed page is inaccessible without login
- Auto-login on page refresh using stored token
- Logout from navbar dropdown

### Feed Page
- Displays all public posts newest first
- Private posts visible only to the author
- Pagination with load more button
- Stories section at the top

### Posts
- Create post with text and/or image
- Choose visibility: Public or Private
- Delete own post with confirm dialog (Cancel / Delete buttons)
- Undo delete within 5 seconds via toast notification
- Post image upload stored locally via Multer

### Likes
- Like and unlike posts
- Like and unlike comments
- Like and unlike replies
- Live like count with avatar stack display

### Comments & Replies
- Add comments to any visible post (Enter key or send)
- View and hide comments toggle
- Reply to any comment
- View and hide replies toggle
- Like and unlike comments and replies

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login with email and password |
| POST | `/api/auth/google` | ❌ | Google OAuth login or register |
| GET | `/api/auth/me` | ✅ | Get current logged-in user |
| GET | `/api/posts` | ✅ | Get feed posts (paginated) |
| POST | `/api/posts` | ✅ | Create a new post |
| PATCH | `/api/posts/:id/like` | ✅ | Toggle like on post |
| DELETE | `/api/posts/:id` | ✅ | Delete own post |
| GET | `/api/posts/:id/comments` | ✅ | Get all comments for a post |
| POST | `/api/posts/:id/comments` | ✅ | Add a comment |
| PATCH | `/api/posts/:id/comments/:cid/like` | ✅ | Toggle like on comment |
| POST | `/api/posts/:id/comments/:cid/replies` | ✅ | Add a reply |
| PATCH | `/api/posts/:id/comments/:cid/replies/:rid/like` | ✅ | Toggle like on reply |

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project with Google Auth enabled

### Backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

### Frontend

```bash
cd client
npm install
# Add your Firebase config to src/firebase.js
npm run dev
```

### Environment Variables

**server/.env**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Key Decisions

### JWT in localStorage
Chose `localStorage` over `httpOnly` cookies for simplicity in a Vite + Express separated setup. For a production deployment, `httpOnly` cookies with CSRF protection would be the preferred approach.

### Google Auth via Firebase + Custom Backend
Firebase handles the Google OAuth redirect flow. After the redirect returns, the Google user's data (name, email, uid) is sent to a custom `/api/auth/google` endpoint which auto-registers new users and returns a JWT — keeping auth logic consistent across all login methods and avoiding dependency on Firebase session management.

### MongoDB Schema Design
- `Post` model stores `likes` as an array of User ObjectIds — efficient for toggle operations and easily populated for display.
- `Comment` model uses an embedded `replies` sub-document array — avoids a separate collection for a feature with low query complexity and keeps comment + reply data co-located for fast reads.
- Indexes added on `createdAt` for feed sorting and `author + visibility` for filtered queries to support large data scale.

### Visibility Filter at Database Level
The feed query uses a MongoDB `$or` filter to return public posts from all users and private posts only from the logged-in user. This is enforced at the database query level rather than filtering in application code — ensuring private posts are never fetched unnecessarily.

### Optimistic Undo Delete
Post deletion is optimistic on the frontend — the post is removed from state immediately and a 5-second undo toast is shown. The actual `DELETE` API call happens on confirm. If the user clicks Undo, the post is restored to its original index in the list without a refetch — giving a smooth and forgiving user experience.

### Scalability Considerations
- Pagination implemented on the feed (10 posts per page) to avoid loading all posts at once
- MongoDB indexes on high-frequency query fields (`createdAt`, `author`, `visibility`)
- Mongoose `.lean()` used on feed queries to reduce memory overhead
- `Promise.all` used for parallel database calls where possible
- Module-based folder structure (auth, post, comment) for easy horizontal scaling of features

---



---

## Author
Saikat Kumar Mondal
mondalsaikatkumar@gmail.com
+8801954355330

.

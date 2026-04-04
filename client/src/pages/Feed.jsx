import React, { useEffect, useState, useCallback } from "react";
import PostBox from "../components/PostBox";
import PostCard from "../components/PostCard";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { fetchFeedPosts } from "../services/api";

const STORY_AVATARS = [
  { seed: "Ryan",   name: "Ryan Roslansky" },
  { seed: "Dylan",  name: "Dylan Field"    },
  { seed: "Steve",  name: "Steve Jobs"     },
];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (page = 1) => {
    setIsLoadingPosts(true);
    try {
      const res = await fetchFeedPosts(page);
      if (page === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts((prev) => [...prev, ...res.data.posts]);
      }
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to load posts:", err.message);
    } finally {
      setIsLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prev) => prev.filter((p) => p._id !== deletedPostId));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="flex gap-8">
        
        {/* Left Sidebar - Styled to match screenshot */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20 h-fit">
          <LeftSidebar />
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0 max-w-2xl">
          {/* Stories Section */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {/* Your Story */}
            <div className="relative rounded-2xl overflow-hidden h-44 bg-blue-500 cursor-pointer shadow-sm">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mb-2">
                  <span className="text-white text-2xl">+</span>
                </div>
                <p className="text-white text-[12px] font-bold">Your Story</p>
              </div>
            </div>

            {/* Other Stories */}
            {STORY_AVATARS.map((s) => (
              <div key={s.seed} className="relative rounded-2xl overflow-hidden h-44 bg-white border border-gray-100 shadow-sm group cursor-pointer">
                <div className="absolute top-2 left-2 z-10">
                   <div className="p-0.5 rounded-full bg-white border-2 border-blue-500">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.seed}`}
                        className="w-6 h-6 rounded-full"
                        alt=""
                      />
                   </div>
                </div>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.seed}`}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-white text-[10px] font-bold truncate text-center">{s.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Post Box */}
          <div className="bg-white rounded-2xl shadow-sm mb-6">
            <PostBox onPostCreated={handlePostCreated} />
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {isLoadingPosts && posts.length === 0 ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onPostDeleted={handlePostDeleted}
                />
              ))
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 flex-shrink-0 sticky top-20 h-fit">
          <RightSidebar />
        </aside>
        
      </div>
    </div>
  );
};

export default Feed;
import React, { useState, useEffect } from 'react';
import StoryReels from '../components/StoryReels';
import PostBox from '../components/PostBox';
import PostCard from '../components/PostCard';
import { fetchFeedPosts } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Home = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadPosts();
    }
  }, [currentUser]);

  const loadPosts = async () => {
    try {
      const res = await fetchFeedPosts(page);
      setPosts(prev => page === 1 ? res.data.posts : [...prev, ...res.data.posts]);
      setHasMore(res.data.posts.length === 10);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
      loadPosts();
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Please log in to view posts</p>
      </div>
    );
  }

  return (
    <div>
      <StoryReels/>
      <PostBox onPostCreated={(newPost) => {
        setPosts(prev => [newPost, ...prev]);
      }}/>

      {loading && posts.length === 0 ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : (
        <>
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}

          {hasMore && (
            <div className="text-center py-4">
              <button
                onClick={loadMorePosts}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
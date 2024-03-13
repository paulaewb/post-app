"use client"
import { useContext, useEffect, useState } from "react";
import { usePosts } from "@/context/PostContext";
import PostCard from "@/components/PostCard";
import localforage from 'localforage';

function HomePage() {
  const { posts, loadPosts } = usePosts();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if data is available in local storage
    localforage.getItem('posts').then((cachedPosts) => {
      if (cachedPosts) {
        // If data is available, use it
        loadPosts(cachedPosts);
      } else {
        // If data is not available, load from API
        loadPosts();
      }
    }).catch((error) => {
      console.error('Error loading posts from local storage:', error);
      // If error occurs, set the error state
      setError(error);
    });
  }, []);

  return (
    <div style={{ margin: '20%' }}>
      {error && (
        <p>Error loading posts. Please try again later.</p>
      )}
      {!error && posts.map(post => (
        <PostCard post={post} key={post.id}></PostCard>
      ))}
    </div>
  );
}

export default HomePage;

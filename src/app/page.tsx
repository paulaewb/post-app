"use client"
import { useContext, useEffect } from "react";
import { usePosts } from "@/context/PostContext";
import PostCard from "@/components/PostCard";
import localforage from 'localforage';

function HomePage() {
  const { posts, loadPosts } = usePosts();

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
      // If error occurs, load from API
      loadPosts();
    });
  }, []);

  return (
    <div style={{ margin: '20%' }}>
      {
        posts.map(post => (
          <PostCard post={post} key={post.id}></PostCard>
        ))
      }
    </div>
  )
}

export default HomePage;

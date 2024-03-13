"use client"
import { useContext, useEffect } from "react";
import { usePosts } from "@/context/PostContext";
import PostCard from "@/components/PostCard";


function HomePage() {
  const {posts, loadPosts} = usePosts();
  useEffect (() => {
    loadPosts()
  }, []);
  return(
    <div>
      {
        posts.map(post => (
          <PostCard post= {post} key = {post.id}></PostCard>
        ))
      }
    </div>
  )
  
}

export default HomePage

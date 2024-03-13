"use client";
import { createContext, useState, useContext } from "react"
import {Post} from "@/interfaces/Post"
export const PostContext = createContext<{
    posts: Post[];
    loadPosts: () => Promise<void>;
    deletePost : (id: string) => Promise<void>
}>({
    posts: [],
    loadPosts: async () => { },
    deletePost: async(id:string) => {},
});

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a Provider')
    }
    return context


}
export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    async function loadPosts() {
        const res = await fetch('/api/post')
        const data = await res.json();
        setPosts(data);
    }
    async function deletePost(id: string){
        const res= await fetch('http://localhost:3000/api/post/'+ id, {
            method: 'DELETE',
        })
        const data = await res.json()
        setPosts(posts.filter(post => post.id !== id));


    }
    return <PostContext.Provider value={{ posts, loadPosts, deletePost }}>
        {children}
    </PostContext.Provider>
}
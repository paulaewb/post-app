import {Post} from "@/interfaces/Post"
import { usePosts } from "@/context/PostContext";

function PostCard({post,}:{post: Post}) {
    
    const {deletePost} = usePosts()
    
    return (
    <div key= {post.id} className = "bg-slate-400 p-4 my-2 flex justify-between">
    <div>
    <h1 className="text-2xl font-bold">{post.title}</h1>
    <p>{post.body}</p>
    </div>
    <div className="flex gap-x-2">
        <button onClick={async() => {
            if (confirm("Are you sure you want to delete this post?")){
                await deletePost(post.id);
            } 
            }}>Delete</button>
    </div>
  </div>
    );
}

export default PostCard;
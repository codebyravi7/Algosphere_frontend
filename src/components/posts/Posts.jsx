import { useState, useEffect } from "react";
import useShowposts from "../../hooks/useShowposts";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  //useHook se import karenge
  const { loading, showPosts } = useShowposts();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await showPosts();
        setPosts(res || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);
  // console.log(posts)
  return (
    <div className="posts flex justify-around items-center">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Post
              key={post?._id}
              title={post?.title}
              description={post?.description}
              image={post?.image}
              id={post?._id}
              author={post?.user}
              likes={post?.likes}
              comments={post?.comments?.length}
            />
          );
        })
      ) : (
        <div className="nopost">
          <h1 className="text-3xl">No posts found</h1>
        </div>
      )}
    </div>
  );
}
{
  /* <Post img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />; */
}

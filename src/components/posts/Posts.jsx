import { useState, useEffect } from "react";
import useShowposts from "../../hooks/useShowposts";
import Post from "../post/Post";
import "./posts.css";
import Showposts from "../showposts/Showposts";

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
  return <Showposts posts={posts} />;
}
{
  /* <Post img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />; */
}

import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowSinglePost from "../../hooks/useShowSinglePost";

export default function Single() {
  const { id } = useParams();
  const [post1, setPost] = useState();
  const { loading, showPost } = useShowSinglePost();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await showPost(id);
        setPost(res || []);
        // console.log(res);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="home">
      <div className="flex h-screen ">
        <div className="posts flex-grow overflow-y-auto hide-scrollbar">
          <SinglePost post={post1} />
        </div>
      </div>
    </div>
  );
}

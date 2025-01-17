import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SinglePost from "../../components/SinglePost";
const Single = () => {
  const { id } = useParams();
  const { showPost} = useAuthContext();
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await showPost(id);
      setPost(res);
    };
    fetchData();
  }, [id]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <SinglePost post={post} />
    </div>
  );
};

export default Single;

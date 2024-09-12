import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  
  const addPost = async (formData,id,qid) => {
    try {
      setLoading(true); // Optional: Set loading state before making the request
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/add/${id}/${qid}`,
        formData,
        { withCredentials: true }
      );
      console.log("res:", res);
    } catch (error) {
      console.error("error:",error);
      toast.error(error.message); // Show error message in the toast
    } finally {
      setLoading(false); // Always set loading to false, whether it succeeds or fails
    }
  };

  return { loading, addPost };
};
export default useAddPost;

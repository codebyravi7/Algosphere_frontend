import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useEditPost = () => {
  const [loading, setLoading] = useState(false);

  const editPost = async (formData) => {
    try {
      setLoading(true); // Optional: Set loading state before making the request
      const res = await axios.put(
        `${import.meta.env.VITE_APP_URL}/api/post/edit`,
        formData,
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error.message); // Show error message in the toast
    } finally {
      setLoading(false); // Always set loading to false, whether it succeeds or fails
    }
  };

  return { loading, editPost };
};
export default useEditPost;

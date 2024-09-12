import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const useShowposts = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const showPosts = async () => {
    setLoading(true);
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/post/allposts`,
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      const data = response.data; // Axios parses the response automatically

      return data?.allposts; // Return the relevant part of the data
    } catch (error) {
      toast.error(error.message); // Display error message
    } finally {
      setLoading(false); // Always execute after request completion
    }
  };

  return { loading, showPosts };
};
export default useShowposts;

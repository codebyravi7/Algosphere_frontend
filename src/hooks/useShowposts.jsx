import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const useShowposts = () => {
  const [loading, setLoading] = useState(false);

  const showPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/post/allposts`,
        { withCredentials: true }
      );
      console.log("response: ", response);

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

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useShowSinglePost = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const showPost = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/post/${id}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      const data = response.data; // Axios automatically parses JSON response
      return data?.post; // Access the relevant part of the data
    } catch (error) {
      toast.error(error.message); // Display the error message
    } finally {
      setLoading(false); // Ensure loading state is always updated
    }
  };

  return { loading, showPost };
};
export default useShowSinglePost;

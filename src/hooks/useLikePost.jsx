import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const useLikepost = () => {
  const [likes, setLikes] = useState();
  const {token} =useAuthContext()
  const addLike = async (postid) => {
    console.log("postid:", postid);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_URL}/api/post/like`,
        { postid }, // Pass the data directly; no need for JSON.stringify
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      // `response.data` contains the parsed JSON response
      const data = response.data;
      console.log("data: ",data); // Handle the response data as needed
    } catch (error) {
      console.error(error); // Handle errors as needed
    }
  };
  return { likes, addLike };
};
export default useLikepost;

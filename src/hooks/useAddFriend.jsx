import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const useAddFriend = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();

  const addFriend = async (id) => {
    setLoading(true);
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/user/addfriend`,
        { id }, // Pass the data directly
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      const data = await api.json();
      // console.log(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const areFriend = async (id) => {
    setLoading(true);
    // console.log(id);
    try {
      const api = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/user/arefriend/${id}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      const data = api.data;
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addFriend, areFriend };
};
export default useAddFriend;

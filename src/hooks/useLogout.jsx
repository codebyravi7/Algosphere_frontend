import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser,token } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/auth/logout`,
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      const data = response.data; // Axios parses JSON automatically
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("data", data);
      // Clear user data
      if (data.success) localStorage.removeItem("jwt"); // Clear JWT from local storage
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message); // Display error
    } finally {
      setLoading(false); // Manage loading state
    }
  };

  return { loading, logout };
};
export default useLogout;

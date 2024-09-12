import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
setLoading(true);
try {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_URL}/api/auth/login`,
    { username, password }, // Data to send in the body
    { withCredentials: true }
  );

  const data = response.data;
  console.log(data)
  if (data.error) {
    throw new Error(data.error);
  }

  // Save user data to local storage and update authentication state
  localStorage.setItem("jwt", JSON.stringify(data));
  setAuthUser(data);

  return data;
} catch (error) {
  toast.error(error.message);  // Show error message in the UI
} finally {
  setLoading(false);  // Always execute after request completion
}

  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    console.log("Please fill in all fields");
    return false;
  }

  return true;
}

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("jwt")) || null
  );
  // console.log(authUser)
  const token = authUser?.token;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingposts, setLoadingPosts] = useState(false);
  // const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [friends, setFriends] = useState(authUser?.user?.friends);
  console.log(friends)
  useEffect(() => {
    const fetchdata = async () => {
      await showPosts();
    };
    fetchdata();
  }, [token]);

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrorssignup({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/auth/signup`,
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },

        // Pass data directly as the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data; // Axios automatically parses JSON
      if (data.error) {
        throw new Error(data.error);
      }

      // Save user data to local storage and update authentication state
      localStorage.setItem("jwt", JSON.stringify(data));
      setAuthUser(data);
      navigate("/add-profiles");
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const login = async ({ username, password }) => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/auth/login`,
        { username, password }, // Data to send in the body
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      // Save user data to local storage and update authentication state
      // console.log("data in login",data)
      localStorage.setItem("jwt", JSON.stringify(data));
      setAuthUser(data);
      toast.success(data?.message);
      return data;
    } catch (error) {
      toast.error(error.message); // Show error message in the UI
    } finally {
      setLoading(false); // Always execute after request completion
    }
  };
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
      if (data.success) localStorage.removeItem("jwt"); // Clear JWT from local storage
      setAuthUser(null);
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message); // Display error
    } finally {
      setLoading(false); // Manage loading state
    }
  };
  const addFriend = async (id) => {
    setLoading(true);
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/user/addfriend`,
        { id },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      // Update friends state
      if (areFriend(id)) {
        //filter out
        setFriends((prevFriends) => prevFriends.filter((friendId) => friendId !== id));
      } else {
        setFriends((prevFriends) => [...prevFriends, id]);
      }
      toast.success(api?.data?.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const areFriend = (id) => {
    return friends.includes(id);
  };
  const addPost = async (formData, id, qid) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/add/${id}/${qid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      const newPost = res.data.post;

      // Add new post to the posts state without reloading
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_APP_URL}/api/post/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      const updatedPost = res.data.updatedPost;

      // Update posts array without reloading
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      toast(res.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addLike = async (postid) => {
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
    } catch (error) {
      toast.error(error);
    }
  };

  const showPosts = async () => {
    setLoadingPosts(true);
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

      const data = response?.data; // Axios parses the response automatically
      setPosts(data?.allposts);
    } catch (error) {
      toast.error(error.message); // Display error message
    } finally {
      setLoadingPosts(false); // Always execute after request completion
    }
  };
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
  const handleAddComment = async ({ comment, id }) => {
    if (!comment.trim()) return; // prevent empty comments
    setLoading(true);
    setError("");
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/addcomment`,
        {
          postId: id,
          content: comment,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async ({ id }) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/delete`,
        { postId: id },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      // Remove post from state without hard-reloading
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        token,
        login,
        loading,
        signup,
        logout,
        addFriend,
        areFriend,
        addPost,
        editPost,
        addLike,
        loadingposts,
        showPosts,
        showPost,
        handleAddComment,
        handleDelete,
        posts,
        friends
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function handleInputErrorssignup({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    console.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    console.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

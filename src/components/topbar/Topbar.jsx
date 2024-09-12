import { Link } from "react-router-dom";
import "./topbar.css";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Topbar() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/search`,
        {
          keyword: inputValue,
        },
        {
          withCredentials: true,
        }
      );
      setPosts(api?.data?.posts);
      navigate('/search/blog',{
        state: { posts },
      })

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="top  bg-gradient-to-b from-cyan-300 to-blue-50 opacity-80">
      <div className="topCenter flex">
        <ul className="topList flex w-full justify-evenly">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="write/post/1">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/code">
              CODE
            </Link>
          </li>
          <form
            onSubmit={handleSubmit}
            className="topListItem ml-10 p-1 px-3 border-2 border-red-300 rounded-lg flex items-center cursor-pointer"
          >
            <input
              type="text"
              className="rounded-lg ml-4 p-1 px-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Updates input value on change
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </ul>
      </div>
      <div className="topRight">
        {authUser ? (
          <>
            <Link className="link" to="/settings">
              <img
                className="topImg"
                src={authUser?.profilePic}
                alt=""
              />
            </Link>
            <Link className="" onClick={handleLogout}>
              LOGOUT
            </Link>
          </>
        ) : (
          <ul className="topList ">
            <li className="topListItem mx-8">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

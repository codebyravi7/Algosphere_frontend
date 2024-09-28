import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../public/logo.png";

const navigation = [
  { name: "Write", href: "/write/post/1", current: false },
  { name: "Practice", href: "/code", current: false },
  { name: "Contests", href: "/contest", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Topbar({ theme, setThemeMode }) {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  console.log("location:: ", location.pathname);
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
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setPosts(api?.data?.posts);
      navigate("/search/blog", {
        state: { posts },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event) => {
    if (theme === "light") setThemeMode("dark");
    else setThemeMode("light");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-gray-900 text-black dark:text-white fixed w-full z-10 mb-12 shadow-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img src={logo} alt="BeLieve" className="h-8 w-auto" />
            </div>
          </div>

          {/* Links and Search */}
          {authUser && (
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium transition"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="hidden md:flex md:ml-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2"
                >
                  <input
                    type="text"
                    className="bg-transparent focus:outline-none dark:text-white"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fas fa-search text-gray-500"></i>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Profile and Theme Toggle */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {authUser ? (
              <>
                <button
                  onClick={handleChange}
                  className="relative border text-lg p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {theme === "light" ? (
                    <span className="material-symbols-outlined">dark_mode</span>
                  ) : (
                    <span className="material-symbols-outlined">
                      light_mode
                    </span>
                  )}
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                      <img
                        alt=""
                        src={authUser?.profilePic}
                        className="h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:text-white">
                    <MenuItem>
                      <Link
                        to={`/${authUser._id}/profile`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {location.pathname === "/register" && (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
                  >
                    Login
                  </Link>
                )}
                {location.pathname === "/login" && (
                  <Link
                    to="/register"
                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
                  >
                    Register
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {authUser && (
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      )}
    </Disclosure>
  );
}

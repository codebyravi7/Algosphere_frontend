import { Link } from "react-router-dom";
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
  { name: "Dashboard", href: "/", current: false },
  { name: "Write", href: "/write/post/1", current: false },
  { name: "Mylist", href: "/code", current: false },
  { name: "Coding", href: "/codingprofiles", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* <img
                alt="Your Company"
                src={logo}
                className="h-8 w-auto"
              /> */}
              <span className="border p-1 px-2 rounded-xl bg-blue-300">
                BeLieve
              </span>
            </div>
            {authUser && (
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="hidden md:flex md:flex-start ">
                    <form
                      onSubmit={handleSubmit}
                      className="topListItem p-1 border-2 border-gray-900 rounded-lg flex items-center cursor-pointer"
                    >
                      <input
                        type="text"
                        className="rounded-lg mr-2 bg-gray-700 text-white outline-none"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Updates input value on change
                      />
                      <button type="submit ">
                        <i className="fas fa-search text-gray-900"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {authUser ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={authUser?.profilePic}
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to={`/${authUser._id}/profile`}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
                >
                  Register
                </Link>
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
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
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

import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function Sidebar({ user }) {
  const { authUser } = useAuthContext();
  const author = user != undefined ? user : authUser;

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 m-1 border-2 border-gray-400 rounded-lg  `}
    >
      <div className="text-center mb-2 ">
        <span className="text-2xl ">ABOUT {author?.fullName}</span>
        <img
          className="p-1 bg-blue-700 rounded-full"
          src={author?.profilePic}
          alt={author?.username}
        />
        <p>
          As a passionate developer 🚀, I thrive on solving complex problems and
          bringing creative ideas to life through code. With expertise in both
          frontend and backend technologies.
        </p>
      </div>
      <div className="w-full h-px bg-gray-400 my-4"></div>
      <div className="mb-4 w-full flex flex-col items-center">
        <span className="text-xl">CATEGORIES</span>
        <ul className="w-full">
          <div className="flex justify-around font-light">
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Life">
                Life
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Music">
                Music
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Sport">
                Sport
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Style">
                Style
              </Link>
            </li>
          </div>
          <div className="flex justify-around font-light">
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Tech">
                Tech
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="link" to="/posts?cat=Cinema">
                Cinema
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="w-full h-px bg-gray-400 my-4"></div>
      <div className="w-full text-center">
        <span className="">FOLLOW AT</span>
        <div className="sidebarSocial">
          <i className="mx-1 text-3xl w-12 fab fa-instagram-square"></i>
          <i className="mx-1 text-3xl w-12 fab fa-facebook-square"></i>
          <i className="mx-1 text-3xl w-12 fab fa-pinterest-square"></i>
          <i className="mx-1 text-3xl w-12 fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}

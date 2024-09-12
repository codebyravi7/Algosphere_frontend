import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [isSidebar, setIsSidebar] = useState(true);
  const toggle = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <>
      {/* <Header /> */}
      <div className="home w-screen">
        <div className="flex h-screen w-screen">
          <div
            className={`${
              isSidebar === true ? "w-1/3" : "w-12"
            }  max-h-screen overflow-y-auto  hide-scrollbar sidebar`}
          >
            <button
              onClick={toggle}
              className={`${
                isSidebar === true ? "bg-red-400" : "bg-blue-300"
              } w-10 font-mono text-xl hover:cursor-pointer rounded-lg p-2 m-1`}
            >
              {isSidebar ? (
                <i className=" fa-solid fa-circle-xmark"></i>
              ) : (
                <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
              )}
            </button>
            {isSidebar && <Sidebar />}
          </div>
          <div className="posts flex-grow overflow-y-auto hide-scrollbar">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

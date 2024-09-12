import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowSinglePost from "../../hooks/useShowSinglePost";

export default function Single() {
  const { id } = useParams();
  const [post1, setPost] = useState();
  const { loading, showPost } = useShowSinglePost();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await showPost(id);
        setPost(res || []);
        // console.log(res);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, []);
  const [isSidebar, setIsSidebar] = useState(true);
  const toggle = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div className="home">
      <div className="flex h-screen ">
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
          {isSidebar && <Sidebar user={post1?.user} />}
        </div>
        <div className="posts flex-grow overflow-y-auto hide-scrollbar">
          <SinglePost post={post1} />
        </div>
      </div>
    </div>
  );
}

// <div className="single">
//   <div className="flex h-screen">
//     <div className="sidebar max-h-screen overflow-y-auto max-w-[400px] hide-scrollbar sidebar">
//       <SinglePost post={post1} />
//     </div>
//     <div className="posts flex-grow overflow-y-auto hide-scrollbar">
//       <Sidebar user={post1?.user} className="sidebarProfile" />
//     </div>
//   </div>
// </div>

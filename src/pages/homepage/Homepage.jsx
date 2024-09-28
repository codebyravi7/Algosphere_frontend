import Posts from "../../components/posts/Posts";
// import "./homepage.css";
import { useEffect, useState } from "react";

export default function Homepage() {
  return (
    <>
      <div className="home w-screen ">
        <div className="flex min-h-screen w-screen">
          <div className="posts flex-grow overflow-y-auto hide-scrollbar">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

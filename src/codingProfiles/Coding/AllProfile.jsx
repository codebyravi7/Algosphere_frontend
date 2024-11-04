import React from "react";
import CodechefProfile from "../codechef/Profile";
import LeetcodeProfile from "../leetcode/Profile";
import CodeforcesProfile from "../codeforces/Profile";
function AllProfile({ username1, username2, username3 }) {
  return (
    <div className="p-10 bg-gray-50 text-black dark:bg-gray-700 dark:text-white min-h-screen flex flex-col justify-center ">
      <CodechefProfile username={username1} />
      <LeetcodeProfile username={username2} />
      <CodeforcesProfile username={username3} />
    </div>
  );
}

export default AllProfile;

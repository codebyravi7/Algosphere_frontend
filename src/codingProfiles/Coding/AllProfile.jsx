import React from "react";
import CodechefProfile from "../codechef/Profile";
import LeetcodeProfile from "../leetcode/Profile";
import CodeforcesProfile from "../codeforces/Profile";
function AllProfile({username1,username2,username3}) {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <CodechefProfile username={username1} />
      <LeetcodeProfile username={username2} />
      <CodeforcesProfile username={username3} />
    </div>
  );
}

export default AllProfile;

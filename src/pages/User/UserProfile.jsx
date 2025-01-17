import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import Showposts from "../../components/Showposts";
import AllProfile from "../../codingProfiles/Coding/AllProfile";
import Button from "../../components/Smallcomps/Button";

function UserProfile() {
  const { token,authUser } = useAuthContext();
  const { id } = useParams();
  const fullName =authUser?.fullName;
  const profilePic=authUser?.profilePic;
  const leetcodeUsername =authUser?.codingProfiles?.leetcode;
  const codeChefUsername =authUser?.codingProfiles?.codechef;
  const codeForcesUsername=authUser?.codingProfiles?.codeforces;
  
  const [filteredPosts, setFilteredPosts] = useState(null); // Consistent naming

  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/user/${id}/profile`,
          {
            headers: {
              "Content-Type": "Application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );        
        setFilteredPosts(response?.data?.filteredPosts); // Correct capitalization
      } catch (error) {
        toast.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, [id, token]);

  return (
    
    <div className="pt-16 dark:bg-gray-700">
      {fullName != null && (
        <>
          <ProfileHeader fullName={fullName} profilePic={profilePic} />
          <AllProfile
            username1={codeChefUsername}
            username2={leetcodeUsername}
            username3={codeForcesUsername}
          />
          <h1 className="text-3xl font-semibold text-center mt-4">
            Top Posts from{" "}
            <span className="text-red-600 border-b-4 border-red-600 cursor-pointer ">{`${fullName}`}</span>
          </h1>
          {/* {console.log(filteredPosts)} */}
          <Showposts posts={filteredPosts} />
          <div className="flex justify-center">
            <Button />
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;

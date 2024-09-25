import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Showposts from "../components/showposts/Showposts";
import AllProfile from "../codingProfiles/Coding/AllProfile";
import Button from "../components/Smallcomps/Button";

function UserProfile() {
  const [fullName, setFullName] = useState(null); // Consistent naming
  const [profilePic, setProfilePic] = useState(null); // Consistent naming
  const [filteredPosts, setFilteredPosts] = useState(null); // Consistent naming

  const { token } = useAuthContext();
  const { id } = useParams();

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

        const data = response?.data;
        setFullName(data?.fullName); // Correct capitalization
        setProfilePic(data?.profilePic); // Correct capitalization
        setFilteredPosts(data?.filteredPosts); // Correct capitalization
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, [id, token]);

  return (
    <div>
      {fullName != null && (
        <>
          <ProfileHeader fullName={fullName} profilePic={profilePic} />
          <AllProfile
            username1="code_y_ravi"
            username2="ravikushwaha7"
            username3="codeforces_ravi_7"
          />
          <h1 className="text-3xl font-semibold text-center mt-4">
            Top Posts from{" "}
            <span className="text-red-600 border-b-4 border-red-600 cursor-pointer ">{`${fullName}`}</span>
          </h1>
          <Showposts posts={filteredPosts} />
          <div className="flex justify-center">
            <Button/>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;

import React from "react";

const ProfileHeader = ({ fullName, profilePic }) => {
  // In a real application, you'd fetch this data from an API or props

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center space-x-6">
        <img
          src={profilePic}
          alt={`${fullName}'s profile`}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md text-white"
        />
        <div>
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <p className="text-lg mt-2 italic">
            {"Coder || Enthusiast || Developer || Happy || Code-Eat-Sleep"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;

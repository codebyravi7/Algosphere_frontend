import React from "react";

const CodeforceUserCard = ({ data }) => {
  const {
    country = "",
    city = "",
    rating = 0,
    friendOfCount = 0,
    handle = "",
    avatar = "",
    firstName = "",
    organization = "",
    rank = "",
    maxRating = 0,
    registrationTimeSeconds = 0,
    maxRank = "",
  } = data || {}; // default empty object if undefined

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full xl:w-[400px] xl:h-[500px] p-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            src={avatar}
            alt={handle}
          />
          <div>
            <h2 className="text-3xl font-semibold">{firstName}</h2>
            <p className="text-sm opacity-75">@{handle}</p>
            <p className="text-sm mt-1 opacity-50">{organization}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-100 ">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex justify-center">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
              MAX RANK: {maxRank.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-yellow-500 mr-2">⭐</span>
            <span className="font-medium">Rating: {rating}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-purple-500 mr-2">🌟</span>
            <span className="font-medium">Max Rating: {maxRating}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-blue-500 mr-2">👥</span>
            <span className="font-medium">Friends: {friendOfCount}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-green-500 mr-2">🏳️</span>
            <span className="font-medium">{country}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300 col-span-2">
            <span className="text-red-500 mr-2">📍</span>
            <span className="font-medium">{city}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300 col-span-2">
            <span className="text-indigo-500 mr-2">📅</span>
            <span className="font-medium">
              Joined: {formatDate(registrationTimeSeconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeforceUserCard;

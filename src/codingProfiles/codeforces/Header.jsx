import React from "react";

const CodeforceUserCard = ({ data }) => {
  const {
    country = "",
    lastOnlineTimeSeconds = 0,
    city = "",
    rating = 0,
    friendOfCount = 0,
    titlePhoto = "",
    handle = "",
    avatar = "",
    firstName = "",
    contribution = 0,
    organization = "",
    rank = "",
    maxRating = 0,
    registrationTimeSeconds = 0,
    maxRank = "",
  } = data?.result?.[0] || {}; // provide default empty object if undefined

  console.log(data?.result[0].country);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <div className="flex items-center space-x-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-white"
            src={avatar}
            alt={handle}
          />
          <div>
            <h2 className="text-2xl font-bold">{firstName}</h2>
            <p className="text-sm opacity-75">@{handle}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <span className="px-2 py-1 bg-gray-200 rounded">
              {rank.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">⭐</span>
            <span>Rating: {rating}</span>
          </div>
          <div className="flex items-center">
            <span className="text-purple-500 mr-2">🌟</span>
            <span>Max Rating: {maxRating}</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-500 mr-2">👥</span>
            <span>Friends: {friendOfCount}</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">🏳️</span>
            <span>{country}</span>
          </div>
          <div className="flex items-center col-span-2">
            <span className="text-red-500 mr-2">📍</span>
            <span>{city}</span>
          </div>
          <div className="flex items-center col-span-2">
            <span className="text-indigo-500 mr-2">📅</span>
            <span>Joined: {formatDate(registrationTimeSeconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeforceUserCard;

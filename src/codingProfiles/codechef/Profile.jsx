import React, { useEffect } from "react";
import ContestRatingChart from "./ContestRatingChart";
import LastActive from "./GetLatest";
import useFetchData from "./FetchData";

const ProfileCard = ({ username = "pritishtomar_1" }) => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData(username);
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const {
    profile,
    name,
    currentRating,
    highestRating,
    countryFlag,
    countryName,
    globalRank,
    countryRank,
    stars,
    heatMap,
    ratingData,
  } = data;

  return (
    <>
      {data?.success ? (
        <div className="w-full max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-600">{name}</h2>
              <p className="text-gray-600 text-sm">{stars}</p>
            </div>
          </div>

          {/* Country and Rating Info */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <img src={countryFlag} alt="Country Flag" className="w-6 h-6" />
              <span className="text-gray-600">{countryName}</span>
            </div>
            <p className="text-xl font-semibold mt-2">
              Current Rating:{" "}
              <span className="text-green-500">{currentRating}</span>
            </p>
            <p className="text-sm text-gray-500">
              Highest Rating: {highestRating}
            </p>
          </div>

          {/* Rank Info */}
          <div className="mt-4 space-y-2">
            <p className="text-lg">
              Global Rank: <span className="font-semibold">{globalRank}</span>
            </p>
            <p className="text-lg">
              Country Rank: <span className="font-semibold">{countryRank}</span>
            </p>
          </div>

          {/* Last Active */}
          <div className="lastactive mt-6">
            <LastActive heatMap={heatMap} />
          </div>

          {/* Contest Ratings */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Contest History</h3>
            <ContestRatingChart ratingData={ratingData} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full mb-4">
          <h1>No such user Found</h1>
        </div>
      )}
    </>
  );
};

export default ProfileCard;

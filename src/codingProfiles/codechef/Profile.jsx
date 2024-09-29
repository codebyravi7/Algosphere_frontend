import React, { useEffect } from "react";
import ContestRatingChart from "./ContestRatingChart";
import LastActive from "./GetLatest";
import useFetchData from "./FetchData";

const ProfileCard = ({ username = "pritishtomar_1" }) => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData(username);
  }, [username]);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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
        <div className="w-full max-w-5xl mx-auto bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300">
          {/* Profile and Contest Chart */}
          <div className="flex flex-col lg:flex-row lg:space-x-6 items-center lg:items-start">
            {/* Profile Section */}
            <div className="w-full lg:w-1/3 flex flex-col items-center bg-blue-50 dark:bg-gray-900 p-6 rounded-lg">
              <img
                src={profile}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4"
              />
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stars}
              </p>

              {/* Country and Rating Info */}
              <div className="mt-4 flex items-center space-x-2">
                <img src={countryFlag} alt="Country Flag" className="w-6 h-6" />
                <span className="text-gray-600 dark:text-gray-400">
                  {countryName}
                </span>
              </div>
              <p className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                Current Rating:{" "}
                <span className="text-green-500">{currentRating}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Highest Rating: {highestRating}
              </p>

              {/* Rank Info */}
              <div className="mt-4 space-y-2 text-center">
                <p className="text-lg text-gray-900 dark:text-white">
                  Global Rank:{" "}
                  <span className="font-semibold">{globalRank}</span>
                </p>
                <p className="text-lg text-gray-900 dark:text-white">
                  Country Rank:{" "}
                  <span className="font-semibold">{countryRank}</span>
                </p>
              </div>
            </div>

            {/* Contest Rating Chart */}
            <div className="w-full lg:w-2/3 mt-6 lg:mt-0 ">
              <h3 className="text-center text-2xl  font-serif text-gray-900 dark:text-white mb-4">
                Contest History
              </h3>
              <ContestRatingChart ratingData={ratingData} />
            </div>
          </div>

          {/* Last Active Section */}
          <div className="lastactive mt-8">
            <LastActive heatMap={heatMap} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full mb-4 text-gray-500 dark:text-gray-300">
          <h1>No such user found</h1>
        </div>
      )}
    </>
  );
};

export default ProfileCard;

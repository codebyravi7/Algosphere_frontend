import React from "react";

const RankCard = ({ data }) => {
  const {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    ranking,
    reputation,
    rating,
  } = data;

  return (
    <div className="w-full max-w-full mx-auto p-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-6 border-b border-blue-300 pb-2">
        LeetCode Stats
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Rank</p>
          <p className="font-bold text-2xl">{ranking}</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Total Solved</p>
          <p className="font-bold text-2xl">{totalSolved}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Easy Solved</p>
          <p className="font-bold text-2xl">{easySolved}</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Medium Solved</p>
          <p className="font-bold text-2xl">{mediumSolved}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Hard Solved</p>
          <p className="font-bold text-2xl">{hardSolved}</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
          <p className="text-lg">Reputation</p>
          <p className="font-bold text-2xl">{reputation}</p>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-md">
        <p className="text-lg">Contest Rating</p>
        <p className="font-bold text-2xl">{rating}</p>
      </div>
    </div>
  );
};

export default RankCard;

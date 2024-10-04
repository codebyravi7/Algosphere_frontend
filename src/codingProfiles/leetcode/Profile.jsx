import React, { useEffect } from "react";
import RankCard from "./Card";
import useFetchData from "./FetchData";

const LeetcodeProfile = ({ username = "amangupta07" }) => {
  const { data1, loading1, error1, fetchData } = useFetchData();
  useEffect(() => {
    fetchData(username);
  }, []);
  if (loading1) return <div>Loading...</div>;
  if (error1) return <div>{error1}</div>;
  // console.log(data1);
  const data = {
    totalSolved: data1?.totalSolved,
    easySolved: data1?.easySolved,
    mediumSolved: data1?.mediumSolved,
    hardSolved: data1?.hardSolved,
    ranking: data1?.ranking,
    reputation: data1?.reputation,
    rating: data1?.rating?.rating?.toString().split(".")[0],
  };

  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
      <RankCard data={data} />
    </div>
  );
};

export default LeetcodeProfile;

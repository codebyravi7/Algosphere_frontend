import React, { useEffect } from "react";
import CodeforceRatingCard from "./Contestgraph";
import CodeforceUserCard from "./Header";
import useFetchData from "./FetchData";

function CodeforcesProfile({ username = "amangupta07" }) {
  const { data1, data2, loading1, error1, fetchData } = useFetchData();
  useEffect(() => {
    fetchData(username);
  }, []);

  console.log(data1?.result[0]);
  return (
    <div className="pt-4 shadow-lg bg-gray-50 dark:bg-gray-800 flex flex-col xl:flex-row justify-center items-center">
      <CodeforceUserCard data={data1?.result[0]} />
      <CodeforceRatingCard contestData={data2?.result} />
    </div>
  );
}

export default CodeforcesProfile;

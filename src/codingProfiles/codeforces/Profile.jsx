import React, { useEffect } from "react";
import CodeforceRatingCard from "./Contestgraph";
import CodeforceUserCard from "./Header";
import useFetchData from "./FetchData";

function CodeforcesProfile({ username = "amangupta07" }) {
  const { data1, data2, loading1, error1,fetchData } = useFetchData();
    useEffect(() => {
      fetchData(username);
    }, []);
  return (
    <div>
      <CodeforceUserCard data={data1} />
      <CodeforceRatingCard data={data2} />
    </div>
  );
}

export default CodeforcesProfile;

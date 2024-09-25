import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData() {
  const [data1, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);

  const fetchData = async (username) => {
    try {
      const [response1, response2] = await Promise.all([
        axios.get(
          `https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`
        ),
        axios.get(`https://codeforces.com/api/user.rating?handle=${username}`),
      ]);

      setData(response1.data); // Setting the combined data
      setData2(response2.data); // Setting the combined data
    } catch (error) {
      setError("Error fetching data,No such User");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data1, data2, loading1, error1, fetchData };
}

export default useFetchData;

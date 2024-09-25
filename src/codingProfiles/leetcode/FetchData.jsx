import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData() {
  const [data1, setData] = useState(null);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);
  const fetchData = async (username) => {
    try {
      const [response, response2] = await Promise.all([
        axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`),
        axios.get(`https://leetcodeapi-v1.vercel.app/rating/${username}`),
      ]);

      // Merging the two responses into a single object
      const combinedData = {
        ...response.data, // All data from the first API
        rating: response2.data, // Adding the rating data from the second API
      };

      setData(combinedData); // Setting the combined data
    } catch (error) {
      setError("Error fetching data,No such User");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data1, loading1, error1 ,fetchData};
}

export default useFetchData;

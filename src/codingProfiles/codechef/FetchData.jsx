import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (username) => {
    try {
      const response = await axios.get(
        `https://codechef-api.vercel.app/handle/${username}`
      );
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
      // alert("error aagyi");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error ,fetchData};
}

export default useFetchData;

import { useState } from "react";
import lclogo from "../../public/images/platforms/leetcode.png";
import cflogo from "../../public/images/platforms/codeforces.png";
import cclogo from "../../public/images/platforms/codechef.jpeg";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProfile = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [handles, setHandles] = useState({
    leetcode: "",
    codeforces: "",
    codechef: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHandles({
      ...handles,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      handles.leetcode == "" ||
      handles.codechef == "" ||
      handles.codeforces == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/user/add-profiles`,
        {
          leetcode: handles.leetcode,
          codeforces: handles.codeforces,
          codechef: handles.codechef,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      const data = api?.data;
      console.log("data from the add-profiles", data);
      navigate("/");
    } catch (err) {
      console.log("Error in adding Profiles: ", err);
      alert("Error in adding ptofiles ,try again");
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-700 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Add Profiles
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="leetcode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Leetcode Handle
            </label>
            <div className="flex items-center mt-1">
              <img src={lclogo} alt="Leetcode Logo" className="w-8 h-8 mr-2" />
              <input
                type="text"
                id="leetcode"
                name="leetcode"
                value={handles.leetcode}
                onChange={handleChange}
                placeholder="Enter Leetcode handle"
                className="p-3 w-full border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="codeforces"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Codeforces Handle
            </label>
            <div className="flex items-center mt-1">
              <img
                src={cflogo}
                alt="Codeforces Logo"
                className="w-8 h-8 mr-2"
              />
              <input
                type="text"
                id="codeforces"
                name="codeforces"
                value={handles.codeforces}
                onChange={handleChange}
                placeholder="Enter Codeforces handle"
                className="p-3 w-full border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="codechef"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Codechef Handle
            </label>
            <div className="flex items-center mt-1">
              <img src={cclogo} alt="Codechef Logo" className="w-8 h-8 mr-2" />
              <input
                type="text"
                id="codechef"
                name="codechef"
                value={handles.codechef}
                onChange={handleChange}
                placeholder="Enter Codechef handle"
                className="p-3 w-full border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-4 rounded-lg font-semibold tracking-wide hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;

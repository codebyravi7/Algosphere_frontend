import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

function Questionrow({ question }) {
  const { token } = useAuthContext();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/question/${question._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setIsChecked(res.data);
    };
    fetchData();
  }, [question._id, token]);

  const handleCheckboxChange = async () => {
    const api = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/question/add-remove`,
      {
        questionId: question._id,
        isChecked,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    if (api.data.success) setIsChecked(!isChecked);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-md transition-colors duration-300 ${
        isChecked
          ? "bg-green-100 text-green-800 border-green-400"
          : "bg-white text-gray-800 border-gray-300"
      } ${
        isChecked
          ? "dark:bg-green-100 dark:text-green-800 border-green-400"
          : "dark:bg-gray-500 dark:text-white border-gray-300"
      } `}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-4 cursor-pointer"
        />
        <a
          className="text-lg font-semibold hover:text-blue-600 hover:underline transition duration-300"
          href={question.link_lt}
          target="_blank"
          rel="noopener noreferrer"
        >
          {question.title}
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a href={question.link_yt} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-youtube text-red-600 hover:scale-110 transition duration-300"></i>
        </a>

        <Link to={`/write/notes/${question._id}`}>
          <i className="fa-solid fa-plus text-gray-800 hover:text-green-600 transition duration-300"></i>
        </Link>
        <Link to={`/write/solution/${question._id}`}>
          <i className="fa-solid fa-pen-nib text-gray-800 hover:text-yellow-600 transition duration-300"></i>
        </Link>
        <Link to={`/question/${question._id}`}>
          <i className="fa-regular fa-comment text-gray-800 hover:text-blue-600 transition duration-300"></i>
        </Link>
      </div>
    </div>
  );
}

export default Questionrow;

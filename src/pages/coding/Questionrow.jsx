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
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setIsChecked(res.data);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = async () => {
    const api = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/question/add-remove`,
      {
        questionId: question._id,
        isChecked,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    if (api.data.success) setIsChecked(!isChecked);
  };
  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-300 ${
        isChecked ? "bg-green-100 text-green-800" : "bg-white text-gray-800"
      }`}
    >
      <div className="title">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckboxChange(question.id)}
          className="mr-4"
        />
        <Link
          className="hover:text-blue-600 hover:opacity-70 hover:shadow-sm"
          to={question.link_lt}
        >
          {question.title}
        </Link>
      </div>
      <div className="buttons">
        <Link className="mx-4" to={question.link_yt}>
          {" "}
          <i className="fa-brands fa-youtube text-red-600"></i>
        </Link>
        <Link className="notes mx-4" to={`/write/notes/${question._id}`}>
          {" "}
          <i className="fa-solid fa-plus"></i>
        </Link>
        <Link className="solution mx-4" to={`/write/solution/${question._id}`}>
          {" "}
          <i className="fa-solid fa-pen-nib"></i>
        </Link>
        <Link className="mx-4" to={`/question/${question._id}`}>
          {" "}
          <i className="fa-regular fa-comment"></i>
        </Link>
      </div>
    </div>
  );
}

export default Questionrow;

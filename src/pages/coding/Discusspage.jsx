import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  FaExternalLinkAlt,
  FaYoutube,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";

function Discusspage() {
  const { token, authUser } = useAuthContext();

  const { id } = useParams();
  const [question, setQuestion] = useState({});

  //fetch the question with its blogs and notes..
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/question/one/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        console.log(response?.data?.question);
        setQuestion(response?.data?.question);
      } catch (error) {
        console.error("Error fetching the question:: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-96 pt-20 p-2 shadow-lg text-black bg-white dark:bg-gray-700 dark:text-white max-w-7xl mx-auto rounded-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {question?.title}
      </h1>

      {/* Links */}
      <div className="flex justify-center space-x-6 mb-8">
        <a
          href={question.link_lt}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaFileAlt className="mr-2" />
          Question Link
          <FaExternalLinkAlt className="ml-2" />
        </a>

        {question.link_yt && (
          <a
            href={question.link_yt}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <FaYoutube className="mr-2" />
            YouTube Link
            <FaExternalLinkAlt className="ml-2" />
          </a>
        )}
      </div>

      {/* Category, Difficulty, Companies */}
      <div className="mb-6 px-4">
        <p className=" text-lg mb-2">
          <strong>Category:</strong> {question.category}
        </p>
        <p className=" text-lg mb-2">
          <strong>Difficulty:</strong> {question?.difficulty}
        </p>
        <p className=" text-lg">
          <strong>Companies:</strong> {question?.companies}
        </p>
      </div>

      {/* Notes */}
      {question?.notes?.length > 0 && (
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-semibold mb-4">Notes:</h2>
          {question?.notes?.map((note, index) => (
            <div
              key={index}
              className="bg-gray-200  dark:bg-gray-900 p-6 rounded-lg mb-6 shadow-sm"
            >
              <h1 className="text-xl text-center">{note?.title}</h1>
              {note?.image?.url && (
                <div className="image h-60 flex justify-center mb-4">
                  <img
                    src={note?.image?.url}
                    alt="Blog image"
                    className="rounded-md"
                  />
                </div>
              )}
              <p className="mb-2">
                <strong>Description:</strong> {note?.description}
              </p>
              <p className="">
                <strong>Comments:</strong>{" "}
                {note?.comments?.length === 0
                  ? "No comments"
                  : note?.comments?.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Solutions (Blogs) */}
      {question?.blogs?.length > 0 && (
        <div className="mb-8 px-4">
          <h2 className="text-center text-2xl font-semibold mb-6 ">
            Solutions:
          </h2>
          {question?.blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6 shadow-sm"
            >
              <h1 className="text-xl text-center">{blog?.title}</h1>
              {blog?.image?.url && (
                <div className="image h-60 flex justify-center mb-4">
                  <img
                    src={blog?.image?.url}
                    alt="Blog image"
                    className="rounded-md"
                  />
                </div>
              )}
              <p className=" mb-2">
                <strong>Description:</strong> {blog?.description}
              </p>
              <p className="">
                <strong>Comments:</strong>{" "}
                {blog?.comments?.length === 0
                  ? "No comments"
                  : blog?.comments?.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Discusspage;

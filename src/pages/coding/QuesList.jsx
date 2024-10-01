import React, { useEffect, useState } from "react";
import axios from "axios";
import Questionrow from "./Questionrow";
import { useAuthContext } from "../../context/AuthContext";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const api = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/question/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        const data = api.data;
        setQuestions(data?.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]); // Add token as a dependency

  return (
    <div className="mx-auto max-w-7xl pt-20 p-6 text-xl dark:bg-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-center">Questions List</h1>
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id}>
              <Questionrow question={question} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionList;

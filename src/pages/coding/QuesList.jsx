import React, { useEffect, useState } from "react";
import axios from "axios";
import Questionrow from "./Questionrow";
import { useAuthContext } from "../../context/AuthContext";
const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const {token} =useAuthContext()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const api = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/question/all`,
          {
            headers: {
              "Content-Type": "Application/json",
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
  }, []);

  return (
    <div className=" mx-auto p-4  text-xl">
      <div className="space-y-4">
        {questions.length > 0 &&
          questions.map((question) => (
            <div key={question._id}>
              <Questionrow question={question} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionList;

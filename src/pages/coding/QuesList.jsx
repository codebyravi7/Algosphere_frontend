import React, { useEffect, useState } from "react";
import axios from "axios";
import Questionrow from "./Questionrow";
const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const api = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/question/all`,
          {
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

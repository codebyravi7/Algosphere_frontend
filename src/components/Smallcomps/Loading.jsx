import React from "react";
import "./Loading.css";
const Loading = ({title}) => {
  return (
    <div className="h-96 pt-20 w-screen flex flex-col justify-center items-center">
      <div className="spinner relative flex justify-center items-center">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="text-3xl font-[cursive] text-center text-gray-600">
        {title}
      </p>
    </div>
  );
};

export default Loading;

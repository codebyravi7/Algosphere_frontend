import React from "react";

const Error500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">500 - Server Error</h1>
      <p className="mt-4">
        Something went wrong on our side. Please try again later.
      </p>
    </div>
  );
};

export default Error500;

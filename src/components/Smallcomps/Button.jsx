import React from "react";
import { Link } from "react-router-dom";

function Button() {
  return (
    <button className=" m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      <Link to={"/"} className="">
        Read More Blogs ...
      </Link>
    </button>
  );
}

export default Button;

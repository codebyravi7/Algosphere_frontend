import React, { useState } from "react";
import { Cloudinary } from "cloudinary-core";
import useAddPost from "../../hooks/useAddPost";
import { useNavigate, useParams } from "react-router-dom";

const cld = new Cloudinary({ cloud_name: "your-cloud-name" });

export default function Write() {
  const navigate = useNavigate();
  const { id, qid } = useParams();

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formdata = new FormData();
  const { loading, addPost } = useAddPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("file", file);
    await addPost(formdata, id, qid);
    setTitle("");
    setDescription("");
    setFile("");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <form
        className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create a Post
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="resize-none w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your content here..."
            rows="5"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold p-4 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

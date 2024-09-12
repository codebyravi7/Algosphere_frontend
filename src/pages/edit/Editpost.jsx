import React, { useState } from "react";
import { Cloudinary } from "cloudinary-core";
import useEditPost from "../../hooks/useEditPost";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const cld = new Cloudinary({ cloud_name: "your-cloud-name" });

export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevtitle, prevdescription, previmage } = location.state || {};

  const [file, setFile] = useState("");
  const [title, setTitle] = useState(prevtitle);
  const [description, setDescription] = useState(prevdescription);
  const formdata = new FormData();
  const { loading, editPost } = useEditPost();
  const { id } = useParams();
  console.log("id::", id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    formdata.append("postId", id);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("previmage", previmage.public_id);
    formdata.append("file", file);
    await editPost(formdata);
    setTitle("");
    setDescription("");
    setFile("");
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Your Post
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your content here..."
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            className="w-full p-3 border rounded-md focus:outline-none"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}

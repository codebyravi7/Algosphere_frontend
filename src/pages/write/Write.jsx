import React, { useState } from "react";
import { Cloudinary } from "cloudinary-core";
import useAddPost from "../../hooks/useAddPost";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X } from "lucide-react";

export default function Write() {
  const navigate = useNavigate();
  const { id, qid } = useParams();
  //id ==post || solution || notes
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formdata = new FormData();
  const { loading, addPost } = useAddPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    formdata.append("title", title);
    formdata.append("description", description);
    if (file) formdata.append("file", file);
    await addPost(formdata, id, qid);
    setTitle("");
    setDescription("");
    setFile(null);
    navigate("/");
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg transition-all duration-500 hover:shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Dynamic Heading based on the id */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          {id === "post" && "Create a Blog Post"}
          {id === "solution" && "Submit Your Solution"}
          {id === "notes" && "Add New Notes"}
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              id === "post"
                ? "Enter blog title"
                : id === "solution"
                ? "Enter solution title"
                : "Enter note title"
            }
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="resize-none w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              id === "post"
                ? "Write your blog content here..."
                : id === "solution"
                ? "Detail your solution..."
                : "Add your notes..."
            }
            rows="5"
            required
          />
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <div className="relative">
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300"
            >
              {file ? (
                <div className="flex items-center">
                  <span className="mr-2 text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-gray-500">
                    Click to upload an image
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-bold p-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Posting..." : id === "post" ? "Create Post" : "Submit"}
        </button>
      </form>
    </div>
  );
}

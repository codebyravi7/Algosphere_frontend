import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevtitle, prevdescription, previmage } = location.state || {};

  const [file, setFile] = useState("");
  const [title, setTitle] = useState(prevtitle);
  const [description, setDescription] = useState(prevdescription);
  const formdata = new FormData();
  const { loading, editPost } = useAuthContext();
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <form
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-500 hover:shadow-3xl"
        onSubmit={handleSubmit}
      >
        <h2 className="pb-1 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center">
          Let's Update Our Blog
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition duration-300"
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
            className="resize-none w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition duration-300"
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
          <div className="relative">
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition duration-300"
            >
              {file ? (
                <div className="flex items-center">
                  <span className="mr-2">{file.name}</span>
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

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold p-4 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

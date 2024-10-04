import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    formdata.append("postId", id);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("previmage", previmage.public_id);
    formdata.append("file", file);
    await editPost(formdata);
    navigate("/");
  };

  return (
    <div className=" dark:text-white flex justify-center items-center min-h-screen  p-4">
      <form
        className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Update Blog</h2>

        <div className="mb-4">
          <label className="block  mb-2">Title</label>
          <input
            id="title"
            type="text"
            className="dark:bg-gray-900  dark:text-white w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            id="description"
            className="resize-none hide-scrollbar dark:bg-gray-900  dark:text-white w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your content here..."
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <div className="relative">
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
            >
              {file ? (
                <div className="flex items-center">
                  <span className="mr-2">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <span className="text-gray-500">Upload an image</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded-md transition-opacity duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

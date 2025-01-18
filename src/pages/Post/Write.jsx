import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

export default function Write() {
  const navigate = useNavigate();
  const { id, qid } = useParams();
  //id ==post || solution || notes
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formdata = new FormData();
  const { loading, addPost } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the file format is valid
    // if (file) {
    //   console.log("file::",file);
    //   const validFormats = ["image/png", "image/jpg"];
    //   if (!validFormats.includes(file.type)) {
    //     alert("Only PNG and JPG formats are allowed.");
    //     setFile(null);
    //     return;
    //   }
    // }

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
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <form
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 transform transition-all duration-500 hover:scale-[1.01]"
        onSubmit={handleSubmit}
      >
        {/* Dynamic Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {id === "post" && "Create a Blog Post"}
            {id === "solution" && "Submit Your Solution"}
            {id === "notes" && "Add New Notes"}
          </h2>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
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

        {/* Description Textarea */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
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

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
              className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 group"
            >
              {file ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                  <Upload className="transition-transform group-hover:scale-110 duration-200" />
                  <span className="text-sm">Click to upload an image</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : id === "post" ? (
            "Create Post"
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

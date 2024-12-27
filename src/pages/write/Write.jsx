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
    if (file) {
      const validFormats = ["image/png", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        alert("Only PNG and JPG formats are allowed.");
        setFile(null);
        return;
      }
    }

    formdata.append("title", title);
    formdata.append("description", description);
    if (file) formdata.append("file", file);
    console.log(file);

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
    <div className="flex justify-center items-center min-h-screen p-6">
      <form
        className="text-black dark:text-white bg-gray-200 dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg transition-all duration-500 hover:shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Dynamic Heading based on the id */}
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          {id === "post" && "Create a Blog Post"}
          {id === "solution" && "Submit Your Solution"}
          {id === "notes" && "Add New Notes"}
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            className="text-black dark:text-white bg-gray-200 dark:bg-gray-900 w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
          <label className="block font-medium mb-2">Description</label>
          <textarea
            id="description"
            className="text-black dark:text-white bg-gray-200 dark:bg-gray-900 resize-none w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
          <label className="block font-medium mb-2">Upload Image</label>
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
                  <Upload size={24} className=" mb-2" />
                  <span className="">Click to upload an image</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`text-white w-full bg-blue-600 font-bold p-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 transform ${
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

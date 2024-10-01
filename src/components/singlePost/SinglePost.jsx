import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import Button from "../Smallcomps/Button";
export default function SinglePost(post) {
  const post1 = post?.post;
  const { authUser, token } = useAuthContext();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const comments = post1?.comments || [];

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/delete`,
        {
          postId: post1?._id,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (err) {
      setError("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // prevent empty comments
    setLoading(true);
    setError("");
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/addcomment`,
        {
          postId: post1?._id,
          content: comment,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      comments.unshift({ _id: Date.now(), user: authUser, content: comment });
      setComment("");
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black dark:text-white shadow-lg  bg-gray-50 dark:bg-gray-800 pt-20 mx-auto max-w-7xl p-1 m-1 ">
      <h1 className="text-center text-3xl font-bold font-lora">
        {post1?.title}
      </h1>
      <div className="">
        <img
          className="h-96 w-auto m-auto border-2 border-gray-600 rounded-xl"
          src={post1?.image?.url}
          alt={post1?.title}
        />
      </div>

      <div className="footContent flex justify-between">
        <div className="flex justify-between items-center text-base font-varela">
          <span>
            Author:{" "}
            <b>
              <Link
                className="text-blue-600 hover:text-blue-800"
                to={`/posts?username=${post1?.user?.fullName}`}
              >
                {post1?.user?.fullName}
              </Link>
            </b>
          </span>
          <span className="ml-2">1 day ago</span>
        </div>
        <div className="buttons">
          {post1?.user?._id === authUser._id && (
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  navigate(`/edit-post/${post1?._id}`, {
                    state: {
                      prevtitle: post1?.title,
                      prevdescription: post1?.description,
                      previmage: post1?.image,
                    },
                  })
                }
                className="text-teal-600 hover:text-teal-800 transition-colors duration-300"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="leading-7">{post1?.description}</p>

      {/* Comment section */}
      <div className="comment-box">
        <p className="text-xl font-semibold">Comments ☰</p>

        {/* Add Comment Form */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <form onSubmit={handleAddComment}>
            <textarea
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              type="text"
              placeholder="Add a comment..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? "Submitting..." : "Add Comment"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Comments List */}
        <div className="mt-5">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border border-gray-300 rounded-lg p-3 my-2  shadow-md"
              >
                <p className="font-semibold ">{comment?.user?.fullName}</p>
                <p className="">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
      <div className="button text-center">
        <Button />
      </div>
    </div>
  );
}

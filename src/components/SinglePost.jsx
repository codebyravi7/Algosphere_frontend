import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Button from "./Smallcomps/Button";
import Comment from "./Comment";
export default function SinglePost({ post }) {
  const { authUser, token, loading, error, handleAddComment, handleDelete } =
    useAuthContext();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState(post?.comments || []);
  useEffect(() => {
    setComments(post?.comments);
  }, [post?.comments]);
  const handleDeletePost = async () => {
    await handleDelete({ id: post?._id });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await handleAddComment({ comment, id: post?._id });
    setComments((prev) => [res?.comment, ...prev]);
    setComment("");
  };


  return (
    <div className="text-black dark:text-white shadow-lg  bg-gray-50 dark:bg-gray-800 pt-20 mx-auto max-w-7xl px-4 ">
      <h1 className="text-center text-3xl font-bold font-lora">
        {post?.title}
      </h1>
      <div className="">
        <img
          className="h-96 w-auto m-auto border-2 border-gray-600 rounded-xl"
          src={post?.image?.url}
          alt={post?.title}
        />
      </div>

      <div className="footContent flex justify-between">
        <div className="flex justify-between items-center text-base font-varela">
          <span>
            Author:{" "}
            <b>
              <Link
                className="text-blue-600 hover:text-blue-800"
                to={`/${post?.user}/profile`}
              >
                {post?.user?.fullName}
              </Link>
            </b>
          </span>
          <span className="ml-2">1 day ago</span>
        </div>
        <div className="buttons">
          {post?.user === authUser?._id && (
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  navigate(`/edit-post/${post?._id}`, {
                    state: {
                      prevtitle: post?.title,
                      prevdescription: post?.description,
                      previmage: post?.image,
                    },
                  })
                }
                className="text-teal-600 hover:text-teal-800 transition-colors duration-300"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDeletePost}
                disabled={loading}
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="leading-7">{post?.description}</p>

      {/* Comment section */}
      <div className="comment-box">
        <p className="text-xl font-semibold">Comments ☰</p>

        {/* Add Comment Form */}
        <div className=" p-4 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-500">
          <form onSubmit={handleComment}>
            <textarea
              className="outline-none dark:text-white bg-gray-50  dark:bg-gray-700 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
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
          {comments && comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="mt-3">
                <Comment
                  key={comment?._id}
                  comment={comment}
                  postId={post?._id}
                />
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

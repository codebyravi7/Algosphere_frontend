import { Link, useNavigate } from "react-router-dom";
import "./singlePost.css";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

export default function SinglePost(post) {
  const post1 = post?.post;
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  // const [comments, setComments] = useState([]);
  const comments = post1?.comments;
  console.log(comments);

  const handleDelete = async () => {
    // console.log("delete thte post");
    await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/post/delete`,
      {
        postId: post1?._id,
      },
      { withCredentials: true }
    );
    navigate("/");
  };
  const [comment, setComment] = useState("");
  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log(comment);
    try {
      const api = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/post/addcomment`,
        {
          postId: post1?._id,
          content: comment,
        },
        {
          withCredentials: true,
        }
      );
      console.log(api?.data);
      comments.unshift({ _id: Date.now(), user: authUser, content: comment });
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="relative overflow-hidden rounded-xl bg-red-500 border-2 border-green-400">
          <img
            className="singlePostImg object-cover w-full h-full"
            src={post1?.image?.url}
            alt=""
          />
        </div>
        <h1 className="singlePostTitle">{post1?.title}</h1>
        {post1?.user?._id === authUser._id && (
          <div className="singlePostEdit">
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
            >
              <i className="singlePostIcon far fa-edit"> </i>
            </button>

            <button onClick={handleDelete}>
              <i className="singlePostIcon far fa-trash-alt"> </i>
            </button>
          </div>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {post1?.user?.fullName}
              </Link>
            </b>
          </span>
          <span>1 day ago</span>
        </div>
        <p className="singlePostDesc">{post1?.description}</p>
      </div>
      <div className="comment-box ">
        <p className="comment text-xl mx-2">Comments ☰</p>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleAddComment}>
            <textarea
              className="comment-box-textarea w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              type="text"
              placeholder="Add a comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                className="comment flex items-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                type="submit"
              >
                Add Comment <i className="fa-solid fa-plus ml-2"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="comments border-2">
          {comments?.length > 0 ? (
            comments?.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="comment-box border-2 border-gray-600 shadow-lg p-2 mx-1 my-2 rounded-md"
                >
                  <p className="comment-author text-lg font-bold">
                    {comment?.user?.fullName}
                  </p>
                  <p className="comment text-lg">{comment.content}</p>
                  {/* {console.log(comment)} */}
                </div>
              );
            })
          ) : (
            <>
              <p> No Comments Yet!!</p>
              <p> No Comments Yet!!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

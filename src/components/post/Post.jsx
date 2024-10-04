import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Post({
  title,
  description,
  image,
  id,
  author,
  likes,
  comments,
}) {
  const {
    authUser,
    token,
    loading,
    addFriend,
    areFriend,
    addLike,
    handleDelete,
  } = useAuthContext();

  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    const fetchData = async () => {
      const res = await areFriend(author);
      setIsFriend(res);
      isLikedDB();
    };
    fetchData();
  }, []);
  const isLikedDB = () => {
    setIsLiked(likes?.includes(authUser?._id));
  };
  const handleFriend = async () => {
    await addFriend(author);
    setIsFriend((prev) => !prev);
  };
  const handleLike = async () => {
    await addLike(id);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };
  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? text?.substring(0, maxLength) + "..." : text;

  const handleDeletePost = async () => {
    await handleDelete({ id: id });
  };

  return (
    <div className="text-black dark:text-white bg-gray-50 dark:bg-gray-800 relative flex flex-col my-6 h-[600px] shadow-lg rounded-lg w-96 transition-all duration-300 hover:shadow-xl">
      <div className="relative h-80 flex justify-center p-2 m-1 bg-gray-300 overflow-hidden text-white rounded-md">
        <Link to={`/post/${id}`}>
          <img
            src={image?.url}
            alt="card-image"
            className="rounded-xl object-cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <div className="px-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-1 cursor-pointer" onClick={handleLike}>
                {isLiked ? (
                  <i className="fa-solid fa-heart text-red-500"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </span>
              <span className="text-sm">{likeCount}</span>
              <span className="mx-2">
                <Link to={`/post/${id}`} className="link flex items-center">
                  <i className="fa-regular fa-comment"></i>
                  <span className="ml-1">{comments}</span>
                </Link>
              </span>
            </div>
            <div className="flex items-center">
              {author === authUser?._id ? (
                <span className="flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/edit-post/${id}`, {
                        state: {
                          prevtitle: title,
                          prevdescription: description,
                          previmage: image,
                        },
                      })
                    }
                    className="text-yellow-400 hover:text-yellow-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </span>
              ) : (
                <button className="link" onClick={handleFriend}>
                  {isFriend ? (
                    <span className="text-red-500 material-symbols-outlined">
                      person_remove
                    </span>
                  ) : (
                    <span className="text-blue-500 material-symbols-outlined">
                      person_add
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
          <span className="postTitle font-semibold">
            <Link to={`/post/${id}`} className="link hover:underline">
              {truncateText(title, 70)}
            </Link>
          </span>
          <hr className="my-2 border-slate-300 dark:border-gray-600" />
          <span className="postDate text-sm">1 hour ago</span>
        </div>
        <p className="leading-normal font-light">
          {truncateText(description, 150)}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2 absolute bottom-0 w-full">
        <Link
          to={`/post/${id}`}
          className="block rounded-md bg-gray-700 dark:bg-gray-50 text-white dark:text-black font-serif text-xl py-2 text-center"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

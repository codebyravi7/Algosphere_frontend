import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useAddFriend from "../../hooks/useAddFriend";
import useLikePost from "../../hooks/useLikePost";
import loadingimg from "../../../public/loading.png";
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
  const { authUser } = useAuthContext();
  const { loading, addFriend, areFriend } = useAddFriend();
  const { addLike } = useLikePost();
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likecount, setLikecount] = useState(likes.length);

  useEffect(() => {
    const fetchData = async () => {
      let res = await areFriend(author);
      setIsFriend(res);
      isLikedDB();
    };
    fetchData();
  }, []);
  const isLikedDB = async () => {
    const likesDB = await likes.includes(authUser._id);
    // console.log(title);
    // console.log(likesDB);
    if (likesDB) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const handleFriend = async () => {
    await addFriend(author);
    setIsFriend(!isFriend);
  };
  const handleLike = async () => {
    await addLike(id);
    if (isLiked) {
      setLikecount(likecount - 1);
    } else {
      setLikecount(likecount + 1);
    }
    setIsLiked(!isLiked);
  };
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const handleDelete = async () => {
    console.log("delete thte post:", id);
    const api = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/post/delete`,
      {
        postId: id,
      },
      { withCredentials: true }
    );
    console.log(api?.data);
  };
  return (
    <div className="relative flex flex-col my-6  h-[600px] shadow-lg shadow-black border border-slate-200 rounded-lg w-96 ">
      <div className="relative h-80 flex justify-center p-2 m-1 bg-gray-300 overflow-hidden text-white rounded-md">
        <Link to={`/post/${id}`} className="">
          <img src={image?.url} alt="card-image" className="rounded-xl" />
        </Link>
      </div>
      <div className="p-4">
        <div className="px-2">
          <div className="w-full flex justify-between">
            <div className="">
              <span className="mr-1 " onClick={handleLike}>
                {isLiked ? (
                  <i
                    className="fa-solid fa-heart cursor-pointer"
                    style={{ color: "#fd4949" }}
                  ></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </span>
              <span>{likecount}</span>
              <span className="mx-2">
                <Link to={`/post/${id}`} className="link">
                  <i className="fa-regular fa-comment"></i>
                  <span className="ml-1">{comments}</span>
                </Link>
              </span>
            </div>
            <div className="mr-3">
              {author === authUser._id ? (
                <span className="">
                  <button
                    className=""
                    onClick={() =>
                      navigate(`/edit-post/${id}`, {
                        state: {
                          prevtitle: title,
                          prevdescription: description,
                          previmage: image,
                        },
                      })
                    }
                  >
                    <span className="material-symbols-outlined text-yellow-400 mr-2">
                      edit_square
                    </span>
                  </button>
                  <button onClick={handleDelete}>
                    <span className="material-symbols-outlined text-red-500">
                      delete
                    </span>
                  </button>
                </span>
              ) : (
                <span className="postCat">
                  <button className="link" onClick={handleFriend}>
                    {!isFriend ? (
                      <span className="text-blue-500 material-symbols-outlined">
                        person_add
                      </span>
                    ) : (
                      <span className="text-red-500 material-symbols-outlined">
                        person_remove
                      </span>
                    )}
                  </button>
                </span>
              )}
            </div>
          </div>
          <span className="postTitle">
            <Link to={`/post/${id}`} className="link">
              {truncateText(title, 70)}
            </Link>
          </span>
          <hr />
          <span className="postDate">1 hour ago</span>
        </div>
        <p className="text-slate-600 leading-normal font-light">
          {truncateText(description, 150)}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2 absolute bottom-0">
        <button
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <Link to={`/post/${id}`}>Read More</Link>
        </button>
      </div>
    </div>
  );
}

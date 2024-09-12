import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useAddFriend from "../../hooks/useAddFriend";
import useLikePost from "../../hooks/useLikePost";
import "./post.css";

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
  useEffect(() => {
    const fetchData = async () => {
      let res = await areFriend(author);
      setIsFriend(res);
      isLikedDB();
    };
    fetchData();
  }, []);
  const [isFriend, setIsFriend] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [likecount, setLikecount] = useState(likes.length);
  const isLikedDB = () => {
    if (likes.includes(authUser._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };
  // setIsFriend(temp)

  const handleFriend = async () => {
    await addFriend(author);
    setIsFriend(!isFriend);
  };
  const handleLike = async () => {
    console.log("id:", id);
    await addLike(id);
    if (isLiked) {
      setLikecount(likecount - 1);
    } else {
      setLikecount(likecount + 1);
    }
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <Link to={`/post/${id}`} className="link">
        <img className="postImg" src={image?.url} alt="" />
      </Link>
      <div className="postInfo">
        <div className="bg-blue-300 w-full flex justify-between">
          <div>
            <span className="mx-2" onClick={handleLike}>
              {isLiked ? (
                <i className="fa-solid fa-thumbs-up"></i>
              ) : (
                <i className="fa-regular fa-thumbs-up"></i>
              )}
            </span>
            <span>{likecount}</span>
            <Link to={`/post/${id}`} className="link">
              <span className="mx-2">
                <i className="fa-regular fa-comment"></i>
                <span className="ml-2">{comments}</span>
              </span>
            </Link>
          </div>
          <div className="mr-3">
            {author === authUser._id ? (
              <span className="postCat">
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
                  Edit
                </button>
              </span>
            ) : (
              <span className="postCat">
                <button className="link" onClick={handleFriend}>
                  {isFriend ? "Add Friend" : "remove"}
                </button>
              </span>
            )}
          </div>
        </div>
        <span className="postTitle">
          <Link to={`/post/${id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        {description}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p>
    </div>
  );
}

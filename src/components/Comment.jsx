import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const Comment = ({ comment, postId }) => {
  const { authUser, fetchReplies, addReply, editComment, deleteComment } =
    useAuthContext();
  const authUserId = authUser?._id;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const [replyContent, setReplyContent] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  // Mock data structure for a comment
  const isAuthor = authUserId === comment?.userId;

  const handleShowReplies = async () => {
    if (!showReplies) {
      const res = await fetchReplies(comment?._id);
      setCommentData((prev) => ({ ...prev, replies: res.replies })); // Update replies
    }
    setShowReplies(!showReplies);
    console.log("Toggling replies for comment:", commentData?._id);
  };

  const handleReply = async () => {
    const res = await addReply(commentData?._id, replyContent);
    setCommentData((prev) => ({
      ...prev,
      replies: [...prev?.replies, res.reply],
    }));
    setShowReplyModal(false);
    setReplyContent("");
  };

  const handleEdit = async () => {
    await editComment(commentData?._id, commentData.content);
    setIsEditable(false);
  };

  const handleDelete = async () => {
    await deleteComment(commentData?._id, postId);
    setCommentData(null);
  };

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  return (
    commentData && (
      <div className="w-full p-4 pt-2 pb-2 pr-0 bg-background border rounded bg-gray-100 shadow-gray-300 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-slate-300 bg-gradient-to-br flex items-center justify-center">
            {commentData?.username?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{commentData?.username}</span>
              <span className="text-xs text-muted-foreground">
                {commentData?.createdAt}
              </span>
            </div>

            <input
              value={commentData?.content}
              onChange={(e) =>
                setCommentData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className={`w-[500px] p-2 border rounded ${
                isEditable ? "bg-slate-300" : ""
              }`}
              readOnly={!isEditable}
            ></input>
            {isEditable && (
              <>
                <button
                  className="text-sm text-white bg-blue-500 rounded px-3 py-1"
                  onClick={handleEdit}
                >
                  Save
                </button>
                <button
                  className="text-sm text-white bg-red-500 rounded px-3 py-1"
                  onClick={() => setIsEditable(false)}
                >
                  Cancel
                </button>
              </>
            )}

            <div className="flex flex-wrap gap-2 shadow-sm p-2 mt-1">
              {isAuthor ? (
                <>
                  <button
                    className=" flex items-center text-sm hover:text-yellow-500 hover:scale-110 pr-2"
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </button>

                  <button
                    className="text-sm flex items-center hover:text-red-500 hover:scale-110 pr-2"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`text-sm flex items-center ${
                      liked ? "text-blue-500" : "text-muted"
                    }`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Like
                  </button>

                  <button
                    className={`text-sm flex items-center ${
                      disliked ? "text-blue-500" : "text-muted"
                    }`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Dislike
                  </button>
                </>
              )}
              {
                <>
                  <button
                    className="text-sm text-muted flex items-center hover:text-blue-500 hover:scale-110 pr-2"
                    onClick={() => setShowReplyModal(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Reply
                  </button>

                  <button
                    className="text-sm text-muted flex items-center hover:text-blue-500 hover:scale-110 pr-2"
                    onClick={handleShowReplies}
                  >
                    
                    {showReplies ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {commentData?.replies?.length || 0} Replies
                  </button>
                </>
              }
            </div>
            {
              <div>
                {showReplyModal && (
                  <div className="flex items-center gap-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Write a reply..."
                    ></textarea>
                    <button
                      className="text-sm text-white bg-blue-500 rounded px-3 py-1"
                      onClick={handleReply}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </div>

        {showReplies &&
          commentData != null &&
          commentData?.replies?.length > 0 && (
            <div className="pl-12">
              {commentData?.replies?.map((reply, index) => (
                <Comment key={index} comment={reply} authUserId={authUserId} />
              ))}
            </div>
          )}
      </div>
    )
  );
};

export default Comment;

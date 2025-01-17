import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  Edit2,
  Trash2,
  Bookmark,
} from "lucide-react";

const SinglePost = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || "");

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Post Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Cover Image */}
        {post.image && (
          <div className="relative h-[400px] w-full">
            <img
              src={post.image}
              alt="Post cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* Post Content */}
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={post.author?.avatar || "/api/placeholder/40/40"}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {post.author?.name || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Content */}
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">{post.content}</div>
          )}

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
                <span className="text-sm font-medium">{post.likes || 0}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm font-medium">
                  {post.comments?.length || 0}
                </span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>
        <div className="border-b pb-6 mb-6">
          <textarea
            placeholder="Add a comment..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Post Comment
          </button>
        </div>

        {/* Comment List */}
        {post.comments?.length > 0 ? (
          <div className="space-y-6">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <img
                  src={comment.author?.avatar || "/api/placeholder/32/32"}
                  alt="Commenter"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      {comment.author?.name || "Anonymous"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

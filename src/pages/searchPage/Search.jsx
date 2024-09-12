import { useLocation } from "react-router-dom";
import Post from "../../components/post/Post";

export default function SearchedBlog() {
  const location = useLocation();
  const { posts } = location.state || {};
  return (
    <>
      <div className="flex-9 flex flex-wrap m-5 justify-around">
        {posts.length > 0 &&
          posts?.map((post) => (
            <div
              key={post._id}
              className="p-4 my-4 m-2 border border-gray-300 rounded-lg shadow-sm "
            >
              <Post
                key={post?._id}
                title={post?.title}
                description={post?.description}
                image={post?.image}
                id={post?._id}
                author={post?.user}
                likes={post?.likes}
                comments={post?.comments?.length}
              />
            </div>
          ))}
      </div>
    </>
  );
}

import { useLocation } from "react-router-dom";
import Showposts from "../../components/showposts/Showposts";
import Button from "../../components/Smallcomps/Button";

export default function SearchedBlog() {
  const location = useLocation();
  const { posts } = location.state || {};
  return (
    <div className="pt-20 min-h-60">
      {posts.length > 0 ? (
        <>
          <h1 className="text-3xl ml-6 text-center">Searched <span className="text-red-500">Posts</span>... </h1>
          <Showposts posts={posts} />
        </>
      ) : (
        <h1 className="text-3xl ml-6 text-center">No Posts Found....</h1>
      )}
      <div className="flex justify-center">
        <Button />
      </div>
    </div>
  );
}

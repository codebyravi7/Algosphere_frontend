import { useLocation } from "react-router-dom";
import Showposts from "../../components/showposts/Showposts";
import Button from "../../components/Smallcomps/Button";

export default function SearchedBlog() {
  const location = useLocation();
  const { posts } = location.state || {};
  return (
    <>
      <h1 className="text-3xl ml-6 ">Searched Posts ... </h1>
      <div>{posts.length > 0 && <Showposts posts={posts} />}</div>
      <div className="flex justify-center">
        <Button />
      </div>
    </>
  );
}

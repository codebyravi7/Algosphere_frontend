import { useEffect, useState } from "react";
import Loading from "../../components/Smallcomps/Loading";
import { useAuthContext } from "../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Showposts from "../../components/showposts/Showposts";

export default function Homepage() {
  const { showPosts } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const res = await showPosts(pageCount, 6);
    setPageCount(pageCount + 1);
    setPosts((prevPosts) => [...prevPosts, ...(res?.allposts || [])]);
    setTotal(res?.totalPosts);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <InfiniteScroll
      dataLength={posts?.length}
      next={fetchData}
      hasMore={posts?.length < total}
      loader={<Loading title={"Wait while we are loading"} />}
      endMessage={
        <div className="text-center">
          <h2>Yay! You have seen it all!</h2>
        </div>
      }
    >
      <div className="pt-16">
        <Showposts posts={posts} />
      </div>
    </InfiniteScroll>
  );
}

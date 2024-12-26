import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Loading from "../../components/Smallcomps/Loading";
import { useAuthContext } from "../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Homepage() {
  const { showPosts, loadingposts } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    console.log("pageno:", pageCount);
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
      loader={<Loading />}
      endMessage={
        <p>
          <b>Yay! You have seen it all!</b>
        </p>
      }
    >
      <div className="home w-screen bg-gray-50 text-black dark:bg-gray-700">
        <div className="flex min-h-screen w-screen">
          <div className="posts flex-grow overflow-y-auto hide-scrollbar">
            <Posts posts={posts} />
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}

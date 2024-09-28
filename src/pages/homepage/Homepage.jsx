import Posts from "../../components/posts/Posts";

export default function Homepage({ posts }) {
  return (
    <div className="home w-screen bg-gray-50 text-black dark:bg-gray-700">
      <div className="flex min-h-screen w-screen">
        <div className="posts flex-grow overflow-y-auto hide-scrollbar">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
}

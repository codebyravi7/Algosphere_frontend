import React from 'react'
import Post from '../post/Post';

function Showposts({posts}) {
  return (
    <div className="pt-4 mx-auto max-w-7xl posts flex justify-around items-center">
      {posts?.length > 0 ? (
        posts?.map((post) => {
          return (
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
          );
        })
      ) : (
        <div className="nopost">
          <h1 className="text-3xl">No posts found</h1>
        </div>
      )}
    </div>
  );
}

export default Showposts
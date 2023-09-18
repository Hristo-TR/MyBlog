import React from "react";
import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <div className="mt-10 mx-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

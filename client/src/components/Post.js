import React from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="w-full px-3 mb-10 bg-white shadow-md">
      {post.photo && (
        <img
          className="w-full h-72 object-cover "
          src={PF+ post.photo}
          alt=""
        />
      )}
      <div className="flex flex-col items-center">
        <div className="text-xs font-varela text-gray-500 mt-4 cursor-pointer">
          {post.categories.map((cat) => (
            <span className="mx-4">{cat.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="font-josefin text-2xl font-bold  mt-2 cursor-pointer">
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="font-lora italic text-sm text-gray-500">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="mx-2 font-varela text-base mt-4 leading-6 text-justify line-clamp-6">
        {post.description}
      </p>
      <Link to={`/post/${post._id}`}>
      <button
          className="m-2 bg-white border-teal-500 border-2 text-teal-500 py-2 px-4 rounded-2xl mt-6 hover:bg-teal-500 hover:text-white"
        >Read post</button>
                </Link>

    </div>
  );
}

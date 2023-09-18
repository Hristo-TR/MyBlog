import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";

export default function FullPostComp() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      await axios.put(`/posts/${post._id}`, 
       { username: user.username, title, description },
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-5">
        {post.photo && (
          <img
            className="w-full h-80 object-cover rounded-md"
            src={PF + post.photo}
            alt=""
          />
        )}
        {update ? (
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="text-center text-4xl font-lora italic mt-6 w-full"
          />
        ) : (
          <h1 className="text-center text-4xl font-lora italic mt-6">
            {post.title}
            {post.username === user?.username && (
              <div className="float-right">
                <button type="button" className="mx-3" onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 448 512"
                  >
                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
                <button
                  type="button"
                  className="mx-3"
                  onClick={() => setUpdate(true)}
                >
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
              </div>
            )}
          </h1>
        )}

        <div className="text-center flex flex-col mr-24 mt-3 text-gray-500">
          <span>
            Author:{" "}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>{" "}
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {update ? (
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="text-xl leading-8 mt-8 text-justify first-letter:font-bold first-letter:text-5xl first-letter:ml-5 font-lora w-full"
          />
        ) : (
          <div className="text-xl leading-8 mt-8 text-justify first-letter:font-bold first-letter:text-5xl first-letter:ml-5 font-lora">
            {post.description}
          </div>
        )}
        {update && (
        <button className="bg-teal-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-teal-600 float-right" onClick={handleUpdate}>Update</button>
        )}
        </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { Context } from ".././context/Context";
import axios from "axios";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="py-8 flex flex-col items-center parallax">
      <form
        className="flex flex-col items-center  lg:p-8 rounded-lg shadow-lg lg:w-3/4 w-full bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="font-lora italic text-3xl pb-10">New Post</h1>
        {file && (
          <img
            className="w-1/2 h-52 object-cover rounded-lg"
            alt=""
            src={URL.createObjectURL(file)}
          />
        )}
        <input
          type="file"
          id="fileInput"
          className="my-6 cursor-pointer shadow-lg"
          onChange={e=>setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Title"
          autofocus
          className="my-6 border border-gray-300 p-2 rounded-md w-1/2 focus:outline-none focus:shadow-lg"
          onChange={e=>setTitle(e.target.value)}
        />
        <div className="w-3/4 h-72">
          <textarea
            placeholder="Share your thoughts"
            type="text"
            className="border border-gray-300 p-2 rounded-md h-full w-full focus:outline-none focus:shadow-lg"
            onChange={e=>setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-teal-600"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

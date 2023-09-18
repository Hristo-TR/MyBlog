import React, { useContext, useState } from "react";
import Sidebar from "../components/SidebarPreview";
import { Context } from "../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
    window.location.replace("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccessMessage("Account successfully updated!");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/users/${user._id}`, {
        data: { userId: user._id },
      });
  
      if (response.status === 200) {
        console.log("User deleted!");
        handleLogout();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="flex mt-8 font-varela">
      <div className="w-4/5 mx-auto p-4 bg-white rounded-lg shadow-lg flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold mb-4 font-lora italic">
          Update Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label for="profile-picture" className="block">
              Profile Picture
            </label>
            <div className="flex flex-col items-center space-x-2">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
                className="w-36 h-36 rounded-full object-cover bg-center mb-2"
              />
              <label
                for="fileInput"
                className="cursor-pointer py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Upload
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mb-4">
            <label for="username" className="block">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder={user.username}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label for="email" className="block">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder={user.email}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label for="password" className="block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            >
              Update
            </button>
          </div>
        </form>
        {successMessage && (
          <span className="text-green-500">Profile successfully updated!</span>
        )}

        <h1 className="text-lg font-semibold mb-4 font-varela text-red-500 text-right cursor-pointer mt-16" onClick={handleDelete}>
          Delete Account
        </h1>
      </div>
      <div className="lg:w-1/5 lg:flex lg:justify-center hidden">
        <Sidebar username={user.username} photo={file ? URL.createObjectURL(file) : PF + user.profilePic} email={user.email}/>
      </div>
      .
    </div>
  );
}

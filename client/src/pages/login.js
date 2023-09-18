import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {  dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };


  return (
    <div className="flex flex-row max-h-screen w-screen font-josefin">
      <div className="lg:w-1/2 lg:flex hidden">
        <img
          className="min-w-full object-cover max-h-screen shadow-2xl"
          src="https://images.pexels.com/photos/1793042/pexels-photo-1793042.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt=""
        />
      </div>
      <div className="flex lg:w-1/2 w-full flex-col items-center justify-center align-middle h-screen pl-10 max-h-screen">
        <form className="" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-4 font-lora italic text-center">
            Log in
          </h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-500">
              Username
            </label>
            <input
              type="name"
              id="username"
              placeholder=""
              className=" px-4 py-2 border rounded-md"
              ref={userRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-500 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder=""
              className=" px-4 py-2 border rounded-md"
              ref={passwordRef}
            />
          </div>
          <div className="text-center">
            <button
              disabled={isFetching}
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-xl hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              Log in
            </button>
          </div>
        </form>
        <h2 className="text-gray-500 mt-6">
          New to MyBlog?
          <span className="cursor-pointer text-teal-500">
            <Link to="/register">Register</Link>
          </span>
        </h2>
      </div>
    </div>
  );
}

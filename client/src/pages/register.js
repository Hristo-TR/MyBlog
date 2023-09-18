import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[email, setEmail] = useState("")
    const[error, setError] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setError("")
            const res = await axios.post("/auth/register", {
            username,
            email,
            password,
        })
        res.data && window.location.replace("/login")
        } catch (error) {
            if (error.response || error.response.data || error.response.data.message) {
                setError(error.response.data);
              } else {
                setError("An error occurred during registration.");
              }
        }
        
       
    }

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
            Register
          </h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-500">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder=""
              className=" px-4 py-2 border rounded-md"
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder=""
              className=" px-4 py-2 border rounded-md"
              onChange={e=>setEmail(e.target.value)}

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
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-xl hover:bg-teal-600"
            >
              Register
            </button>
          </div>
        </form>
        <span className="text-red-500">{error}</span>
        <h2 className="text-gray-500 mt-6">
          Already have an account?
          <span className="cursor-pointer text-teal-500">
            <Link to="/login">Log in</Link>
          </span>
        </h2>
      </div>
    </div>
  );
}

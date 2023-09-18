import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function NavBar() {
  const listyle = "m-4 cursor-pointer font-light font-lora text-2xl hover:scale-105"; // Adjust text size as needed
  const { user, dispatch } = useContext(Context);
  const [nav, setNav] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust the breakpoint as needed

  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  }

  // Add an event listener to update isSmallScreen when the window size changes
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {nav && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 z-20"
          onClick={() => setNav(false)}
        />
      )}
      {nav && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <ul className="bg-white p-8 rounded-lg text-4xl shadow-xl">
            <li className={listyle}>
              {" "}
              <Link  to="/" onClick={() => setNav(false)}>Home</Link>
            </li>
            <li className={listyle}>
              <Link onClick={() => setNav(false)} to="/">About</Link>
            </li>
            {user && (
              <li className={listyle}>
                <Link onClick={() => setNav(false)} to="/new-post">New Post</Link>
              </li>
            )}
            <Link onClick={() => setNav(false)} to="/login">{!user && "Login"}</Link>
            <li className={listyle} onClick={handleLogout} >
              {user && "Logout"}
            </li>
            <div className="flex  flex-row items-center justify-center mr-3">
          {user && (
            <Link to="/settings" onClick={() => setNav(false)}>
              <img
                src={PF + user.profilePic}
                alt=""
                className="w-11 h-11 rounded-full object-cover bg-center shadow-2xl "
              />
            </Link>
          ) }
          </div>
          </ul>
        </div>
      )}
      <div className={` flex flex-row items-center justify-between w-full h-12 bg-white z-10 sticky top-0 font-lora shadow-2xl ${isSmallScreen ? 'flex-col' : ''}`}>
        <div className="font-signature lg:text-4xl text-xl ml-3 flex flex-row items-center cursor-default">
          MyBlog |
          {isSmallScreen ? (
            <button onClick={() => setNav(!nav)} className="p-2">
              {nav ? "Close" : "Menu"}
            </button>
          ) : (
            <ul className="flex flex-row">
              <li className={listyle}>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className={listyle}>
                <Link to="/">About</Link>
              </li>
              {user && (
                <li className={listyle}>
                  <Link to="/new-post">New Post</Link>
                </li>
              )}
              <li className={listyle} onClick={handleLogout}>
                {user && "Logout"}
              </li>
            </ul>
          )}
        </div>
        <div className="lg:flex hidden flex-row items-center mr-3">
          {user ? (
            <Link to="/settings">
              <img
                src={PF + user.profilePic}
                alt=""
                className="w-11 h-11 rounded-full object-cover bg-center shadow-2xl"
              />
            </Link>
          ) : (
            <Link className="lg:flex hidden" to="/login">Login</Link>
          )}
        </div>
      </div>
    </>
  );
}

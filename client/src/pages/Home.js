import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Posts from "../components/Posts"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])
  

  useEffect(() => {
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    const queryParamName = "user"; 

    if (getQueryParam(queryParamName)) {
      setShowDiv(true);
    }
  }, []);


  return (
    <div className="flex flex-col justify-center items-center bg-slate-50">
        <Header/>
        {showDiv && (
          <span className=" left-1/2 text-3xl mt-10 ">Posts by selected author</span>
        )}
        <div className="flex flex-row w-screen">
           <div className="w-full"> <Posts posts={posts} /> </div>
        </div>
    </div>
  )
}

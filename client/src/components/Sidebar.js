import React, { useState,useEffect } from 'react'
import axios from'axios';
import { Link } from "react-router-dom";


export default function Sidebar() {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
      const getCategories = async ()=>{
        const res = await axios.get("/categories")
        setCategories(res.data)
      }
      getCategories()
    }, [])
    
  return (
    <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">About the author</span>
            <img className="rounded-full object-cover h-48 w-48 m-2" src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v937-aew-139-klhdd3an.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=ace5f93316825feedd89a502ed8e69aa' alt=""/>
            <p className="m-2 p-7 text-justify">Ad amet aliquip non qui eiusmod occaecat quis laboris Lorem reprehenderit ullamco cillum. Non velit enim et fugiat non do Lorem officia.</p>
        </div>
        <div className="flex flex-col w-full items-center">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">Categories:</span>
            <ul className="mb-7 px-8 text-justify">
                {categories.map(category=>(
                    <Link to={`/?category=${category.name}`}>
                  <li className="inline-block w-1/2 mt-4 cursor-pointer">{category.name}</li>
                  </Link>
                ))}
            </ul>
        </div>
        <div className="flex flex-col items-center w-full">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">Follow me</span>
            <div className="p-2">
                Facebook/Profile1.com
            </div>
        </div>
    </div>
  )
}

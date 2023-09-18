import React from 'react'
import Landscape from '../assets/book.jpg'
import '../index.css'

export default function Header() {
  return (
    <div className="">
        <div className="flex flex-col items-center font-lora italic text-gray-700">
            <span className="absolute top-32 text-8xl font-signature not-italic ">MyBlog</span>
            <img src={Landscape} alt='' className="object-cover w-screen h-450 bg-center"/>
        </div>
    </div>
  )
}

import React from 'react'
//import axios from'axios';


export default function Sidebar(props) {
    // const [categories, setCategories] = useState([])
    
    // useEffect(() => {
    //   const getCategories = async ()=>{
    //     const res = await axios.get("/categories")
    //     setCategories(res.data)
    //   }
    //   getCategories()
    // }, [])
    
  return (
    <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">Preview</span>
            <img className="rounded-full object-cover h-48 w-48 m-2" src={props.photo} alt=""/>
            <p className="m-2 p-7 text-justify text-3xl font-lora italic">{props.username}</p>
        </div>
        {/* <div className="flex flex-col w-full items-center">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">Categories:</span>
            <ul className="mb-7 px-8 text-justify">
                {categories.map(category=>(
                    <Link to={`/?category=${category.name}`}>
                  <li className="inline-block w-1/2 mt-4 cursor-pointer">{category.name}</li>
                  </Link>
                ))}
            </ul>
        </div> */}
        <div className="flex flex-col items-center w-full">
            <span className="m-2 p-1 w-4/5 border-b-2 border-t-2 font-varela text-lg font-semibold">Contact me</span>
            <div className="p-2">
                Email: {props.email}
            </div>
        </div>
    </div>
  )
}

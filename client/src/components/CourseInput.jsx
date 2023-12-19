import { useState } from "react"
import Search from "../assets/Search.png";
import { useCourseContext } from "../context";

export default function CourseInput({ 
    name,
    placeholder,
    subjectId,
    className,
}){
  const courseContext = useCourseContext();
  const { handleChange } = useCourseContext();
  const value = courseContext[name];
  
  if(className) className = className +  " w-full p-1 border-2 border-gray-400 rounded focus:outline-none ";
  else className = "w-full p-1 border-2 border-gray-400 rounded focus:outline-none"

  return (
    <input 
        type="text"
        name={name}
        value={value}
        onChange={(e)=>handleChange(name, e.target.value)}
        placeholder={placeholder?placeholder:`Enter ${name}`}
        className={className}
    />
  )
}

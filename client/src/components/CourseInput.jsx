import { useState } from "react"
import Search from "../assets/Search.png";
import { useCourseContext } from "../context";

export default function CourseInput({ 
    name, 
    defaultValue,
    placeholder,
    subjectId,
    className,
}){

  const [localChange, setLocalChange] = useState(defaultValue?defaultValue:"");

  const { handleChange } = useCourseContext();

  const localHandleChange = (e)=>{
    setLocalChange(e.target.value);
    
    if(subjectId && subjectId!=="") handleChange(e.target.name, e.target.value, subjectId);
    else handleChange(e.target.name, e.target.value);
  }
  
  if(className) className = className +  " w-full p-1 border-2 border-gray-400 rounded focus:outline-none ";
  else className = "w-full p-1 border-2 border-gray-400 rounded focus:outline-none"

  return (
    <input 
        type="text"
        name={name}
        value={localChange}
        onChange={localHandleChange}
        placeholder={placeholder?placeholder:`Enter ${name}`}
        className={className}
    />
  )
}

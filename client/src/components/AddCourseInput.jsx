import { useState } from "react"
import ImageComponent from "../assets"
import { useCourseContext } from "../context";

export default function AddCourseInput({ arr, propertyName, className }) {

    const { handleChange } = useCourseContext();
    const [localArr, setLocalArr] = useState(arr);
    const [lastInput, setLastInput] = useState("");

    const handleLocalChange = (e) => {
        const temp = localArr;
        temp[e.target.name] = e.target.value;
        setLocalArr(temp);
        handleChange(propertyName, temp);
    }
    const handleClick = (e)=>{
        const temp  = localArr.push(lastInput);
        handleChange(propertyName, temp);
        setLastInput("");
    }

    // if(className) className = className + " my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    // else className = "my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    return (
        <div className={className}>
            {
                localArr.map((item, index)=>{
                    return <input 
                        name={index.toString()} 
                        value={localArr[index]} 
                        onChange={handleLocalChange}
                        className="my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
                    />
                })
            }
            <div className="flex justify-between">
                <ImageComponent 
                    imageName="PlusImage" 
                    alt="plus" 
                    onClick={handleClick} 
                    className="hover:cursor-pointer w-11 h-11"
                />
                <input 
                    name={arr.length.toString()} 
                    value={lastInput} 
                    onChange={()=>setLastInput()} 
                    className="my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
                />
            </div>
        </div>
  )
}

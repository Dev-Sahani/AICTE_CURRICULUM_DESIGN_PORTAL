import { useState } from "react"
import ImageComponent from "../assets"
import { useCourseContext } from "../context";

export default function AddCourseInput({ propertyName, className }) {

    const courseContext = useCourseContext();
    const {handleChange} = courseContext;
    let localArr = courseContext[propertyName];
    if(!localArr) localArr = [];
        // console.log(localArr);
    const [lastInput, setLastInput] = useState("");

    const handleLocalChange = (e) => {
        const temp = localArr;
        temp[e.target.name] = e.target.value;
        handleChange(propertyName, temp)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        localArr.push(lastInput);
        handleChange(propertyName, localArr);
        setLastInput("");
    }

    // if(className) className = className + " my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    // else className = "my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    return (
        <div className={className}>
            {
                localArr.map((item, index)=>{
                    return <input 
                        key={index}
                        name={index.toString()} 
                        value={localArr[index]} 
                        onChange={handleLocalChange}
                        className="my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
                    />
                })
            }
            <form className="flex justify-between" onSubmit={handleSubmit}>
                <ImageComponent 
                    imageName="PlusImage" 
                    alt="plus" 
                    onClick={handleSubmit} 
                    className="hover:cursor-pointer w-11 h-11"
                />
                <input 
                    name={localArr.length.toString()} 
                    value={lastInput} 
                    onChange={(e)=>setLastInput(e.target.value)} 
                    className="my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
                />
            </form>
        </div>
  )
}

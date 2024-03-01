import { useState } from "react"
import { useCourseContext } from "../context";
import Label from "./Label";

export default function AddCourseInput({ propertyName, className, propertyKeys }) {

    const courseContext = useCourseContext();
    const {handleChange} = courseContext;
    let localArr = courseContext[propertyName]?.cur;
    if(!localArr) localArr = [];
    
    const [lastInput, setLastInput] = useState({});
    const handleLocalChange = (e) => {
        const temp = {cur:localArr};
        const [ind,key] = e.target.name.split("+");
        temp.cur[ind].cur[key] = e.target.value;
        handleChange(propertyName, temp)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        localArr.push(lastInput);
        handleChange(propertyName, localArr);
        setLastInput({});
    }

    // if(className) className = className + " my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    // else className = "my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    return (
        <div className={className}>
            {
                localArr.map((item, index)=>{
                    const res = []
                    for(let key of propertyKeys){
                        res.push(<div className="ml-6 flex justify-between" key={index+key}>
                            <Label >{key}</Label>
                            <input 
                                name={index.toString()+"+"+key} 
                                value={item?.cur[key]} 
                                onChange={handleLocalChange}
                                className="my-1 w-[70%] p-1 border-2 border-gray-400 rounded focus:outline-none"
                            />
                        </div>)
                    }
                    return <div key={index} className="relative my-2">
                        <h2 className="text-primary-900 absolute top-left">{index+1}</h2>
                        {res}
                    </div>
                })
            }
            <form className="relative" onSubmit={handleSubmit}>
                <h2 
                    className="text-3xl absolute top-left hover:cursor-pointer hover:scale-1.05"
                    onClick={handleSubmit} 
                >+
                </h2>
                <div className="ml-8">
                {
                    propertyKeys.map((el,ind)=><div className="flex justify-between" key={ind}>
                        <Label>{el}</Label>
                        <input 
                            name={localArr.length.toString() +"+"+el} 
                            value={lastInput[el]}
                            onChange={(e)=>setLastInput(prev=>({...prev, [el]:e.target.value}))}
                            className="my-1 w-[70%] p-1 border-2 border-gray-400 rounded focus:outline-none"
                        />
                    </div>)
                }
                </div>
            </form>
        </div>
  )
}

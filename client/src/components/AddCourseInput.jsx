import { useState } from "react"
import { useCourseContext } from "../context";
import Label from "./Label";

const check = (lastInput, propertyKeys) => {
    let ans = true;
    for(let key of propertyKeys) {
        if(!lastInput || !lastInput[key] || lastInput[key]==="") ans = false;
    }
    return ans;
}

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
        if(localArr?.length === 0 || !check(lastInput, propertyKeys)) return;
        localArr.push(lastInput);
        handleChange(propertyName, localArr);
        setLastInput({});
    }

    // if(className) className = className + " my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    // else className = "my-1 w-full p-1 border-2 border-gray-400 rounded focus:outline-none"
    return (
        <div className={className}>
            <form className="col-span-2 relative bg-primary-500 rounded-xl py-2 px-4 flex items-center justify-between gap-2 overflow-hidden" onSubmit={handleSubmit}>
                {/* <div className="w-full flex justify-between"> */}
                {
                    propertyKeys.map((el,ind)=>
                        <div className="flex justify-between" key={ind}>
                            <Label className="text-white">{el}</Label>
                            <input 
                                name={localArr.length.toString() +"+"+el} 
                                value={lastInput[el]}
                                onChange={(e)=>setLastInput(prev=>({...prev, [el]:e.target.value}))}
                                className="my-1 w-[70%] p-1 border-2 border-gray-400 rounded focus:outline-none"
                            />
                        </div>
                    )
                }
                {/* </div> */}
                <div
                    className="px-2 py-1 bg-secondary-500 rounded-lg hover:cursor-pointer hover:bg-secondary-600"
                    onClick={handleSubmit} 
                >
                    <h2 className="text-white whitespace-nowrap font-medium w-full text-center" style={{fontSize: "1.2rem"}}>Add +</h2>
                </div>
            </form>
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
            
        </div>
  )
}

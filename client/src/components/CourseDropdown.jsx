import { useEffect, useState } from "react";
import { useCourseContext } from "../context";

const CourseDropdown = ({name, defaultValue, list, subjectId, className})=>
{
  const courseContext = useCourseContext();
  const [value, setValue] = useState("");
  useEffect(()=>{
    if(!defaultValue || defaultValue==="") {
      if(subjectId) defaultValue = courseContext[subjectId][name]?.cur;
      else defaultValue = courseContext[name]?.cur;
    }
    setValue(defaultValue)
  }, [courseContext]);

  if(!name || !list || list.length === 0) {
    throw new Error("Please pass all arguments in CourseDropdown component");
  }

  const { handleChange } = useCourseContext();

  const onChange = (e)=>{
    setValue(e.target.value);
    if(subjectId && subjectId!=="") handleChange(e.target.name, e.target.value, subjectId);
    else handleChange(e.target.name, e.target.value);
  }
  
  if(!list.includes(defaultValue)) list.unshift(defaultValue);

  if(className) className = className +  " border-2 border-gray-400 rounded m-2 px-4 py-1 focus:outline-none";
  else className = "border-2 border-gray-400 rounded m-2 px-4 py-[0.4rem] focus:outline-none";

  return(
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="border-2 border-gray-400 rounded m-2 px-4 py-1 focus:outline-none"
    >
      {
        list.map( (itemValue, index)=>{
          return (
            <option key={index} value={itemValue} className="text-sm">
              {itemValue}
            </option>
          );
        })
      }
    </select>
  )
}

export default CourseDropdown;
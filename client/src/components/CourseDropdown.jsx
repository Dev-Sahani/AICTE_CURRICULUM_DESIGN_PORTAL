import { useEffect, useState } from "react";
import { useCourseContext } from "../context";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const CourseDropdown = ({name="", defaultValue="", list=[], subjectId})=>
{
  const courseContext = useCourseContext();
  const [value, setValue] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(()=>{
    if(defaultValue && defaultValue !== "" && defaultValue.cur) 
      setValue(defaultValue.cur)
    else 
      setValue("Error")

    // eslint-disable-next-line
  }, [courseContext]);

  const { updateProperty } = useCourseContext();
  const { common_id } = useParams();

  const onChange = (e)=>{
    setLocalLoading(true);
    
    updateProperty(e.target.name, e.target.value, common_id)
      .then(res=>{
        console.log(res);
        if(res) setValue(e.target.value);
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }
  
  
  if(defaultValue && defaultValue.cur && defaultValue!=="" && !list.includes(defaultValue.cur)) 
    list.unshift(defaultValue.cur);
  
  if(localLoading) {
    return <Loading count={1} containerClassName="h-12"/>
  }

  return(
    <div className="flex items-center">
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className={`border-2 border-gray-400 border-r-0 rounded-l m-2 mr-0  px-4 py-1 focus:outline-none ${defaultValue && defaultValue.new && defaultValue.new.length > 0 && "bg-accent-400"}`}
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

    {
      defaultValue && defaultValue.new && defaultValue.new.length > 0 
      && 
      <button className="text-sm border-2 border-gray-400 border-l-0 h-full w-full p-1 bg-accent-400 rounded-r-lg">Open</button>
    }
    </div>
  )
}

export default CourseDropdown;
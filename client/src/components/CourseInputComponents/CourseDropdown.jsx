import { useEffect, useState } from "react";
import { useCourseContext } from "../../context";
import { Loading, Modal } from "../";
import { useParams } from "react-router-dom";
import ViewChangesButton from "./ViewChangesButton";

const CourseDropdown = ({name="", list=[], subjectId})=>
{
  const { [name]: propertyName, updateProperty } = useCourseContext();
  const [value, setValue] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(()=>{
    if(propertyName && propertyName !== "" && propertyName.cur) 
      setValue(propertyName.cur)
    else 
      setValue("Error")

    // eslint-disable-next-line
  }, [propertyName]);

  const { common_id } = useParams();

  const onChange = (e)=>{
    setLocalLoading(true);
    
    updateProperty(e.target.name, e.target.value, common_id)
      .then(res=>{
        // console.log(res);
        setShowMessage(true);
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }
  
  
  if(propertyName && propertyName.cur && propertyName!=="" && !list.includes(propertyName.cur)) 
    list.unshift(propertyName.cur);
  
  if(localLoading) {
    return <Loading count={1} containerClassName="h-12 w-48" />
  }

  return(
    <div className="flex items-center">
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className={`border-2 border-gray-400 m-2 px-4 py-1 focus:outline-none ${(propertyName && propertyName.new && propertyName.new.length > 0) ? "bg-accent-400 rounded-l border-r-0 mr-0" : "rounded"}`}
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
      propertyName && propertyName.new && propertyName.new.length > 0 
      && 
      // <button className="text-sm border-2 border-gray-400 h-full w-full rounded-r-lg overflow-hidden">
      <ViewChangesButton className="!p-0 !rounded-l-none border-2 border-gray-400" name={name}>
        <img src="/change.png" alt="changes" className="w-[1.92rem] h-[1.92rem]"/>
      </ViewChangesButton>
    }

    {
      showMessage && 
      <Modal className="w-[20rem] h-[8rem] p-4 flex items-center justify-center text-center" onClose={()=>{setShowMessage(false)}}>
        <p>{`Request to change the value of ${name} has been sent.`}</p>
      </Modal>
    }
    </div>
  )
}

export default CourseDropdown;
import { useEffect, useState } from "react";
import { useCourseContext } from "../../context";
import { Loading, Modal } from "../";
import { useParams } from "react-router-dom";
import ViewChangesButton from "./ViewChangesButton";

const CourseDropdown = ({name="", list=[], subjectId})=>
{
  const { [name]: propertyName, updateProperty, getCourse } = useCourseContext();
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
    // setLocalLoading(true);
    setValue(e.target.value);
    setShowMessage(true);
    // updateProperty(e.target.name, e.target.value, common_id)
    //   .then(res=>{
    //     // console.log(res);
    //     setShowMessage(true);
    //   })
    //   .finally(()=>{
    //     setLocalLoading(false);
    //   })
  }
  
  const handleCancel = ()=>{
    setShowMessage(false);
    setValue(propertyName?.cur || "");
  }
  const handleSubmit = ()=>{
    setLocalLoading(true);
    setShowMessage(false);
    updateProperty(name, value, common_id)
      .then(async res=>{
        if(res) await getCourse(common_id);
      })
      .finally(()=>{
        setValue(propertyName?.cur || "")
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
      className={`border-2 border-gray-300 m-2 px-4 py-1 focus:outline-none ${(propertyName && propertyName.new && propertyName.new.length > 0) ? "bg-accent-400 rounded-l border-r-0 mr-0" : "rounded"}`}
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
      <ViewChangesButton className="!p-0 !rounded-l-none border-2 border-gray-300" name={name} showImage imageClassName="w-[1.92rem]" />
    }

    {
      showMessage && 
      <Modal className="!w-[20rem] !h-[10rem] p-4 py-6 text-center flex flex-col justify-between" onClose={handleCancel}>
        <p>{`Are you really want to change the value of ${name}`}</p>
        <div className="w-full flex items-center justify-around">
          <button className="min-w-[100px] px-2 py-1 rounded bg-secondary-500" onClick={handleSubmit}>
            Yes
          </button>
          <button className="min-w-[100px] px-2 py-1 rounded bg-red-400" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Modal>
    }
    </div>
  )
}

export default CourseDropdown;
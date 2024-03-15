import { useState } from "react";
import { useCourseContext } from "../../context";
import classnames from 'classnames'
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import ViewChangesButton from "./ViewChangesButton";

export default function CourseTextArea({ 
    name,
    placeholder,
    // subjectId,
    className,
}){
  const { common_id } = useParams();
  const {[name] : propertyName, updateProperty, getCourse} = useCourseContext();
  const [value, setValue] = useState(propertyName?.cur || "No Such field exists!");
  const [localLoading, setLocalLoading] = useState(false);

  const handleSave = async ()=> {
    setLocalLoading(true);
    updateProperty(name, value, common_id)
      .then(async res=>{
        if(res) await getCourse(common_id);
      })
      .finally(()=>{
        setValue(propertyName?.cur || "No Such field exists!");
        setLocalLoading(false);
      })
  }

  className = classnames(
    "w-full p-1 max-h-100",
    "border-2 border-gray-400 rounded focus:outline-none resize-none",
    className, 
    {"bg-accent-300": propertyName && propertyName.new && Array.isArray(propertyName.new) && propertyName.new.length > 0,}
  )

  if(localLoading) {
    return <Loading count={1} cardClassName="!h-28 w-full" containerClassName="w-full" />
  }

  return (
    <div>
      <textarea 
        type="text"
        name={propertyName}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder={placeholder?placeholder:`Enter ${propertyName}`}
        className={className}
      />
      
      <div className="mt-2 flex items-center gap-4">
        {
          propertyName && propertyName.new && Array.isArray(propertyName.new) && propertyName.new.length>0 
          &&
          <ViewChangesButton name={name}/>
        }
        {
          value !== (propertyName?.cur || "No Such field exists!")
          &&
          <>
            <button onClick={handleSave} className="px-3 py-1 rounded bg-secondary-500 text-white">
              Save
            </button>
            <button onClick={()=>setValue(propertyName?.cur || "No Such field exists!")} className="px-3 py-1 rounded bg-red-400 text-white">
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  )
}

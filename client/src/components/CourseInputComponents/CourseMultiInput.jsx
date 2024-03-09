import { useState } from "react";
import { useCourseContext } from "../../context";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import Label from "../Label";

export default function CourseMultiInput({ 
    name, 
    subNames, 
    index, 
    type="text", 
    placeholder,
    className,
}){
  const { common_id } = useParams();
  const {[name] : propertyName, updateProperty} = useCourseContext();
  
  const [value, setValue] = useState(
      propertyName && propertyName.cur 
      ?
      (
        index!==undefined && Array.isArray(propertyName.cur) && propertyName.cur.length > index 
        ?
        propertyName.cur[index].cur 
        :
        propertyName.cur
      )
      : 
      "No Such field exists!"
  );
      
  const [localLoading, setLocalLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(
    index !== undefined ?
    (propertyName.cur[index].new && Array.isArray(propertyName.cur[index].new) && propertyName.cur[index].new.length > 0) 
    || (propertyName.del && (propertyName.del).reduce((currValue, item)=>currValue||item.index*1===index, false))
    :
    propertyName.new && Array.isArray(propertyName.new) && propertyName.new.length>0 
  )
  
  if(subNames && !Array.isArray(subNames)) 
  return <div>Error: subNames should be an array</div>
  
  if(!propertyName || !propertyName.cur || (index && (!Array.isArray(propertyName.cur) || propertyName.cur[index].length > index)))
    return <div>Error: The property name provided does not exists</div>

  const handleSave = async ()=> {
    setLocalLoading(true);

    const nameToPass = (index!==undefined ? name+"."+index.toString() : name);
    updateProperty(nameToPass, value, common_id)
      .then(res=>{
        if(res) {
            setValue(
                index!==undefined && Array.isArray(propertyName.cur) && propertyName.cur.length > index 
                ?
                propertyName.cur[index].cur 
                :
                propertyName.cur
            );
            setHasChanges(true)
        }
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }


  const handleCancel = ()=>{
    if(index !== undefined) {
        setValue(propertyName.cur[index].cur);
    } else {
        setValue(propertyName.cur);
    }
  }

  if(localLoading) {
    return <Loading count={subNames.length} cardClassName="!h-12 w-full" />
  }
  

  return (
    <div className={className}>
      {subNames.map((subProperty) =>
            <div className="flex justify-between gap-1" key={subProperty}>
                {
                subProperty && 
                <Label>{subProperty}</Label>
                }
                <input 
                    type={type}
                    value={value[subProperty]}
                    onChange={(e)=>setValue({...value, [subProperty]: e.target.value})}
                    placeholder={placeholder ? placeholder:`Enter ${subProperty}`}
                    className={`my-1 w-[70%] p-1 border-2 border-gray-400 rounded focus:outline-none ${hasChanges ? "bg-accent-400" : ""}`}
                />
            </div>
        )}

      <div className="mt-2 flex items-center gap-4">
        {
          hasChanges
          &&
          <button className="px-2 py-1 bg-accent-500 rounded overflow-hidden text-white">
            View Changes
          </button>
        }
        {
          (
            subNames.reduce((currValue, item)=>
                currValue = currValue || value[item] !== propertyName.cur[index]?.cur[item]
            , false)
          )
          &&
          <>
            <button onClick={handleSave} className="px-3 py-1 rounded bg-secondary-500 text-white">
              Save
            </button>
            <button onClick={handleCancel} className="px-3 py-1 rounded bg-red-400 text-white">
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  )
}

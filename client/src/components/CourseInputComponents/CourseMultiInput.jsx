import { useState } from "react";
import { useCourseContext } from "../../context";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import Label from "../Label";
import ViewChangesButton from "./ViewChangesButton";

export default function CourseMultiInput({ 
    name, 
    subNames, 
    index, 
    type="text", 
    placeholder,
    className,
}){
  const { common_id } = useParams();
  const {[name] : propertyVal, updateProperty, deleteProperty } = useCourseContext();
  
  const [value, setValue] = useState(
      propertyVal && propertyVal.cur 
      ?
      (
        index!==undefined && Array.isArray(propertyVal.cur) && propertyVal.cur.length > index 
        ?
        propertyVal.cur[index].cur 
        :
        propertyVal.cur
      )
      : 
      "No Such field exists!"
  );
      
  const [localLoading, setLocalLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(
    index !== undefined ?
    (propertyVal.cur[index].new && Array.isArray(propertyVal.cur[index].new) && propertyVal.cur[index].new.length > 0) 
    || (propertyVal.del && (propertyVal.del).reduce((currValue, item)=>currValue||item.index*1===index, false))
    :
    propertyVal.new && Array.isArray(propertyVal.new) && propertyVal.new.length>0 
  )
  
  if(subNames && !Array.isArray(subNames)) 
  return <div>Error: subNames should be an array</div>
  
  if(!propertyVal || !propertyVal.cur || (index && (!Array.isArray(propertyVal.cur) || propertyVal.cur[index].length > index)))
    return <div>Error: The property name provided does not exists</div>

  const handleSave = async ()=> {
    setLocalLoading(true);

    const nameToPass = (index!==undefined ? name+"."+index.toString() : name);
    updateProperty(nameToPass, value, common_id)
      .then(res=>{
        if(res) {
            setValue(
                index!==undefined && Array.isArray(propertyVal.cur) && propertyVal.cur.length > index 
                ?
                propertyVal.cur[index].cur 
                :
                propertyVal.cur
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
        setValue(propertyVal.cur[index].cur);
    } else {
        setValue(propertyVal.cur);
    }
  }

  const handleDelete = async (e)=>{
    await deleteProperty(name, index, common_id)
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
          <Label className="capitalize !text-base !font-medium">{subProperty}</Label>
          }
          <input 
            type={type}
            value={value[subProperty]}
            onChange={(e)=>setValue({...value, [subProperty]: e.target.value})}
            placeholder={placeholder ? placeholder:`Enter ${subProperty}`}
            className={`my-1 w-[70%] p-1 border-2 border-gray-400 rounded focus:outline-none ${hasChanges ? "bg-accent-300" : ""}`}
          />
        </div>
      )}

      <div className="mt-2 flex justify-end items-center gap-4">
        {
          hasChanges
          &&
          <ViewChangesButton name={name + "." + index.toString()} />
        }
        {
          (
            subNames.reduce((currValue, item)=>
                currValue = currValue || value[item] !== propertyVal.cur[index]?.cur[item]
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
        <button onClick={handleDelete} className="px-3 py-1 rounded bg-red-400 text-white">
          Delete
        </button>
      </div>
    </div>
  )
}

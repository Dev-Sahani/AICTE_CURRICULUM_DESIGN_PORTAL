import { useState } from "react";
import { useCourseContext } from "../../context";
import classnames from 'classnames'
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import ViewChangesButton from "./ViewChangesButton";

export default function CourseInput({ 
    name, 
    placeholder,
    subjectId, 
    className,
}){
  const { common_id } = useParams();
  const {[subjectId ? "subjects" : name] : propertyValue, updateProperty, getCourse} = useCourseContext();
  const [value, setValue] = useState(getActualValue(name, propertyValue, subjectId));
  const [localLoading, setLocalLoading] = useState(false);

  if(value === undefined) return <div>No such `{name}` exists!</div>

  const handleSave = async (e)=> {
    setLocalLoading(true);
    updateProperty(
      getActualName(name, propertyValue, subjectId), // property name
      {[name]: value},  // value
      common_id // subject id
    )
      .then(async (res)=>{
        if(res) await getCourse(common_id);
      })
      .finally(()=>{
        setValue(getActualValue(name, propertyValue, subjectId));
        setLocalLoading(false);
      })
  }

  className = classnames(
    "w-full px-1 py-px border-2 border-gray-300 rounded focus:outline-none resize-none",
    className, 
    {"bg-accent-300": hasChanges(name, propertyValue, subjectId),
    // "!w-[60%]": value !== getActualValue(name, propertyValue, subjectId),
    }
  )

  if(localLoading) {
    return <Loading count={1} cardClassName="!h-12 w-full" containerClassName="w-full" />
  }

  return (
    <div className="w-full flex items-center my-1.5 mx-2 gap-3">
      <label className="min-w-[110px] capitalize">{name}</label>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder={placeholder ? placeholder : `Enter ${name}`}
        className={className}
      />
      
      {/* <div className="flex items-center gap-3"> */}
        {
          hasChanges(name, propertyValue, subjectId)
          &&
          <ViewChangesButton name={getActualName(name, propertyValue, subjectId)} subName={name} showImage className="min-w-[2rem]" imageClassName="!h-[2rem] !w-[2rem]" />
        }
        {
          value !== getActualValue(name, propertyValue, subjectId)
          &&
          <>
            <button onClick={handleSave} className="px-2 py-1 rounded bg-secondary-500 text-white">
              Save
            </button>
            <button onClick={()=>setValue(getActualValue(name, propertyValue, subjectId))} className="px-2 py-1 rounded bg-red-400 text-white">
              Cancel
            </button>
          </>
        }
      {/* </div> */}
    </div>
  )
}

const getActualName = (name, property, subjectId)=>{
  if(subjectId) {
    let index = 0;
    const sub = property.cur?.find((s, ind)=> {
      if(s?.cur?.common_id === subjectId) {
        index = ind;
        return true;
      }
      return false;
    })
    
    // eslint-disable-next-line
    if(sub && sub.cur && sub.cur[name]) return "subjects"+"."+index.toString();
    else return undefined;
  } 
  else if (property) return property;
  else return undefined
}

const getActualValue = (name, property, subjectId)=>{
  if(subjectId) {
    const sub = property.cur?.find((s)=>
      s?.cur?.common_id === subjectId
    )

    if(sub && sub.cur && sub.cur[name]) return sub.cur[name];
    else return undefined;
  }  
  else if(property && property.cur) return property.cur;
  return undefined;
}

const hasChanges = (name, property, subjectId)=>{
  if(subjectId && property) {
    const sub = property.cur?.find((s)=>
      s?.cur?.common_id === subjectId
    )
    return sub && sub.new && sub.new.length > 0 && sub.new.reduce((currValue, newProp)=>{return currValue||(newProp?.value[name]!==undefined)}, false);
  }  
  return property && property.new && property.new.length > 0;
}
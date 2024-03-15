import React, { useState } from 'react'
import classnames from 'classnames';
import { Loading } from "../";
import ViewChangesButton from "./ViewChangesButton";
import { useCourseContext } from '../../context';

export default function SubjectInput({subjectId, name, index, placeholder, className}) {
  const common_id = undefined;
  const { allSubjects, updateProperty } = useCourseContext();
  const [value, setValue] = useState(getActualValue(allSubjects, subjectId, name));
  const [localLoading, setLocalLoading] = useState(false);
  
  if(value === undefined) return <div>No such `{name}` exists!</div>

  const handleSave = async ()=> {
    setLocalLoading(true);
    updateProperty(index ? name+"."+index.toString() : name, value, common_id, subjectId)
      .then(res=>{
        if(res) setValue(getActualValue(allSubjects, subjectId, name));
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }

  className = classnames(
    "w-full p-1 max-h-32",
    "border-2 border-gray-400 rounded focus:outline-none resize-none",
    className, 
    {"bg-accent-300": hasChanges(allSubjects, subjectId, name)}
  )

  if(localLoading) {
    return <Loading count={1} cardClassName="!h-12 w-full" containerClassName="w-full" />
  }

  return (
    <div>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder={placeholder?placeholder:`Enter ${name}`}
        className={className}
      />
      
      <div className="mt-2 flex items-center gap-2">
        {
          hasChanges(allSubjects, subjectId, name)
          &&
          <ViewChangesButton name={name} showImage={true} />
        }
        {
          value !== getActualValue(allSubjects, subjectId, name)
          &&
          <>
            <button onClick={handleSave} className="px-3 py-1 rounded bg-secondary-500 text-white">
              Save
            </button>
            <button onClick={()=>setValue(getActualValue(allSubjects, subjectId, name))} className="px-3 py-1 rounded bg-red-400 text-white">
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  )
}

const getActualValue = (allSubjects, subjectId, name)=>{
    if(!allSubjects || !subjectId || !allSubjects.cur) return undefined;
    const sub = allSubjects.cur.find((s)=>
      s.common_id === subjectId
    );
    if(!sub || !sub[name]) return undefined;
    return sub[name];
}

const hasChanges = (allSubjects, subjectId, name)=>{
  if(!allSubjects || !subjectId || !allSubjects.cur) return undefined;
  const sub = allSubjects.cur.find((s)=>
    s.common_id === subjectId
  );
  if(!sub || !sub[name]) return undefined;
  return sub[name].new && Array.isArray(sub[name].new) && sub[name].new.length > 0 ;
}
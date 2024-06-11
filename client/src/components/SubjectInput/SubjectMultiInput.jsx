import { useState } from 'react'
import { Loading } from "..";
import ViewChangesButton from "./ViewChangesButton";
import { useSubjectContext } from '../../context';
import { useParams } from 'react-router-dom';

export default function SubjectMultiInput({ name }) {
  const { subject: {[name]: propertyValue} } = useSubjectContext();
  
  if(!propertyValue || !propertyValue.cur || !Array.isArray(propertyValue.cur)) return <div>No such '{name}' exists!</div>

  propertyValue.del?.forEach((item, index)=>{
    const len = propertyValue.cur[item?.index]?.new?.length;
    if(len===0 || (len!==undefined && propertyValue.cur[item?.index]?.new[len - 1]?.value !== "deleted"))
      propertyValue.cur[item?.index]?.new?.push({by: item?.by, value: "deleted", index: index});
  })

  return (
    <div className='w-full flex flex-col gap-4 p-3 py-4'>
      {
        propertyValue.cur.map((input, index)=> 
          <SubjectInput 
            name={name}
            index={index}
            key={index}
            propertyValue={input}
          />
        )
      }
    </div>
  )
}



function SubjectInput({name, index, propertyValue, className, placeholder}) {
  const { subject_common_id } = useParams();
  const { updateProperty, getSubject } = useSubjectContext();
  const [value, setValue] = useState(propertyValue?.cur ? propertyValue?.cur : "");
  const [localLoading, setLocalLoading] = useState(false);

  const handleUpdate = async (del=undefined)=> {
    const fullName = name + "." + index.toString();
    setLocalLoading(true);
    updateProperty(fullName, del ? null : value, subject_common_id, del)
      .then(async res=>{
        if(res) {
          // ------------- test for reload remaining ---------------
          await getSubject(subject_common_id);
          setValue(propertyValue?.cur);
        }
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }

  if(localLoading) return (
    <div className='w-full flex justify-between items-center gap-3'>
      <label className='min-w-20px text-primary-500'>{index + 1}</label>
      <Loading count={1} cardClassName="!w-full !h-[3.3rem] !rounded" containerClassName="!w-full !h-[3.3rem] !rounded"/>
    </div>
  )

  return (
    <div className='w-full flex justify-between items-center gap-3'>
      <label className='min-w-20px text-primary-500'>{index + 1}</label>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder={placeholder?placeholder:`Enter ${name}`}
        className={`
          px-2 py-1 outline-none border-2 border-gray-300 w-full rounded
          ${propertyValue && propertyValue.new && propertyValue.new.length > 0 && "bg-accent-300"}
        `}
      />

      {
        propertyValue && propertyValue.new && propertyValue.new.length > 0
        &&
        <ViewChangesButton name={name} index={index} showImage={true} imageClassName="h-8 min-w-6" />
      }
      <button className='h-9 w-9 border-2 p-1 border-red-500 rounded-lg' onClick={()=>handleUpdate(true)}>
        <img className="" src='/deleteButton.png' alt='del'/>
      </button>
      {
        value!==undefined && value!==null && value !== propertyValue?.cur
        &&
        <>
          <button onClick={()=>handleUpdate()} className="px-2 py-1 rounded bg-secondary-500 text-white" disabled={localLoading}>
            Save
          </button>
          <button onClick={()=>setValue(propertyValue?.cur)} className="px-2 py-1 rounded bg-red-400 text-white" disabled={localLoading}>
            Cancel
          </button>
        </>
      }
    </div>
  )
}

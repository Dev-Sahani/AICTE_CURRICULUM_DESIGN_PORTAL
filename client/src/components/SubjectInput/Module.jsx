import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSubjectContext } from "../../context";
import { Loading } from "..";
import { ViewChangesButton } from ".";

export default function Module ({ module, index }) {
  const name = "modules";
  const {subject_common_id} = useParams();
  const { updateProperty, getSubject } = useSubjectContext();
  const [value, setValue] = useState(module?.cur);
  const [localLoading, setLocalLoading] = useState(false);

  if(!value) return <div>Invalid {name} value</div>;

  const handleUpdate = async ()=> {
    const fullName = name + "." + index.toString();
    setLocalLoading(true);
    updateProperty(fullName, value, subject_common_id)
      .then(async res=>{
        if(res) {
          setValue(module?.cur);
          // ------------- test for reload remaining ---------------
          await getSubject(subject_common_id);
        }
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  }

  if(localLoading) return <Loading count={1} cardClassName="!h-12" />

  return (
    <div className='w-full flex flex-col items-end gap-3 bg-primary-50 rounded p-4' key={index}>
      { 
        value &&  
        <div className='w-full'>
          {
            value.title && 
            <div className='flex gap-3'>
              <h4 className='min-w-[100px] font-semibold text-primary-500'>Module Title</h4>
              <input 
                name={`module.${index}`}
                value={value.title}
                onChange={(e)=>setValue({...value, title: e.target.value})}
                className={`
                  px-2 py-1 mb-3 outline-none border-2 border-gray-300 w-full rounded
                  ${module && module.new && module.new.length > 0 && "bg-accent-300"}
                `}
              />
            </div>
          }
          {
            value.topics && Array.isArray(value.topics) 
            &&
            <div className='flex gap-3'>
              <h4 className='min-w-[100px] font-semibold text-primary-500'>Modules</h4>
              <div className='w-full grid grid-cols-2 gap-3'>
                {
                  value.topics.map((topic, ind) => 
                    <input 
                      key={ind}
                      name={`module.${index}.topics.${ind}`}
                      value={value.topics[ind]}
                      onChange={(e)=>setValue({
                          ...value, 
                          topics: value.topics.map((v,i)=> i===ind ? e.target.value : v)
                      })}
                      className={`
                        px-2 py-1 outline-none border-2 border-gray-300 w-full rounded
                        ${module && module.new && module.new.length > 0 && "bg-accent-300"}
                      `}
                    />
                  )
                }
              </div>
            </div>
          }
        </div>
      }
      <div className={`flex gap-3 ${module?.new?.length > 0 || value !== module?.cur ? "block":"hidden"}`}>
      {
        module.new.length > 0
        &&
        <ViewChangesButton name={name} index={index} showText imageClassName="h-8" />
      }
      {
        value !== module?.cur
        &&
        <>
          <button onClick={handleUpdate} className="px-3 py-1 rounded bg-secondary-500 text-white">
            Save
          </button>
          <button onClick={()=>setValue(module?.cur)} className="px-3 py-1 rounded bg-red-400 text-white">
            Cancel
          </button>
        </>
      }
      </div>
    </div>
  )
}
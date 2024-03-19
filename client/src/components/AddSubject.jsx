import { useRef, useState } from "react";
import {Loading, Modal} from "./";
import { useCourseContext } from "../context";
import { useParams } from "react-router-dom";

export default function AddSubject({inputFields, name, index, id, onClose, inCourse=true, modalClassName, loadingCount}) 
{
  const formRef = useRef(null); 
  const { common_id } = useParams();
  const { addProperty, getCourse } = useCourseContext();
  const [localLoading, setLocalLoading] = useState(false);

  if(!inputFields || !Array.isArray(inputFields) || !name || !id || !onClose || typeof onClose !== "function") 
    return <div>Some Error</div>

    

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLocalLoading(true);
    const formData = new FormData(formRef.current);
    
    const formDataObj = {new: [], cur: {}};
    formData?.forEach((value, key)=>{
      formDataObj.cur[key] = value;
    })
    // console.log(formDataObj);

    const res = await addProperty(name, formDataObj, common_id);
    if(res) await getCourse(common_id);
    setLocalLoading(false);
    onClose();
  }

  if(localLoading) {
    return (
      <Modal onClose={onClose} className={modalClassName}>
        <Loading count={loadingCount || 8} cardClassName="!h-12" />
      </Modal>
    )
  }
  return (
    <Modal onClose={onClose} className={modalClassName}>
      <form onSubmit={handleSubmit} className="h-full w-full p-4 flex flex-col gap-2 justify-between" ref={formRef}>
        <h1 className="w-full text-center text-3xl text-semibold text-primary-500">Enter basics details</h1>
        <div className="w-full flex flex-col gap-2">
        {
          inputFields.map((input, ind)=>{ 
            let inputBox;
            if(input?.type==="text" || input?.type==="number" || !input?.type) {
                inputBox = <input className="p-1 rounded w-full border-2 border-gray-300" name={input?.title} required {...input} />
            } 
            else if(input?.type === "textarea") {
                inputBox = <textarea type="text" className="p-1 rounded w-full border-2 border-gray-300" name={input?.title} required {...input} />
            }
            return (
              <div className="w-full flex justify-between items-center gap-4" key={ind}>
                { input?.title && <label className="font-medium text-lg capitalize min-w-[120px]">{input?.title}</label> }
                { inputBox }
              </div>
            )
          })
        } 
        </div>
        {/* 
          <div className="mt-4 w-full flex items-center">
            <button className="min-w-[200px] py-1.5 px-2 text-white rounded bg-primary-500" onClick={(e)=>{e.preventDefault()}}>
              Add pre-existed Subject
            </button> 
        */}
        <div className="w-full flex gap-4 justify-end items-center">
          <button type="submit" className="bg-secondary-500 py-1.5 px-2.5 text-white rounded">Create</button>
          <button onClick={onClose} className="py-1.5 px-2.5 rounded text-white bg-red-500">Cancel</button>
        </div>
        {/* </div> */}
      </form>
    </Modal>
  )
}

//   const inputFields = ["code", "title", "category", "semester", "l", "t", "p", "credits",]
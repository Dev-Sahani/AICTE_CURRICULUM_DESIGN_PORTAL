import { useEffect, useState } from "react";
import { useCourseContext } from "../../../../context"
import { useParams } from "react-router-dom"


export default function Syllabus() {
  const {getAllSubjects, allSubjects} = useCourseContext();
  const {common_id, subject_common_id} = useParams();
  const [data, setData] = useState();
  console.log(data)

  useEffect(()=>{
    const sub = allSubjects?.find((subject)=>subject?.doc?.common_id===subject_common_id)
    setData(sub?.doc)
  }, [allSubjects])
  useEffect(()=>{
    getAllSubjects(common_id)
  }, [])

  return (
    <div>
      {
        data && 
       <div className="w-full flex justify-evenly">
          <label>title</label>
          <p>{data.title?.cur}</p>
        </div>
      }
    </div>
  )
}
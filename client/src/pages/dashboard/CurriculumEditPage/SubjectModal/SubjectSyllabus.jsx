import { useEffect, useState } from "react";
import { useCourseContext } from "../../../../context"
import { useParams } from "react-router-dom"


export default function Syllabus() {
  const {getAllSubjects, allSubjects} = useCourseContext();
  const {common_id, subject_common_id} = useParams();
  const [data, setData] = useState();

  useEffect(()=>{
    getAllSubjects(common_id);
    setData()
  }, [])

  return (
    <div>Syllabus</div>
  )
}
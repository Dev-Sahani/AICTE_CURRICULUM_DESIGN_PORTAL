import { useState, useEffect } from "react";
import { useCourseContext } from "../../../../context";
import { useParams } from "react-router-dom";
import { Loading, CourseInput } from "../../../../components";
import { getSubject } from "../../../../utils/getSubject";

export default function BasicInfo() {
  const { common_id, subject_common_id } = useParams()

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { subjects, getCourse } = useCourseContext();
  useEffect(()=>{
    getSubject(subject_common_id, subjects, ()=>getCourse(common_id))
      .then(res=>{
        setData(res);
      })
      .finally(()=>setLoading(false));
    // eslint-disable-next-line 
  }, [])

  if(loading)return <Loading count={5} />

  return (
    <div>
      <h1 className="w-full text-center text-xl font-semibold">Basic Info</h1>
      {
        data && data.cur && 
        Object.keys(data.cur).map(key => {
          if(["common_id", "id", "_id", "version"].includes(key)) return null;
          return (
            <div className="flex justify-evenly"key={key}>
              <CourseInput name={key} subjectId={subject_common_id}/>
            </div>
          )
        })
      }
    </div>
  )
}
import { useState, useEffect } from "react";
import { useCourseContext } from "../../../../context";
import { useParams } from "react-router-dom";
import { Loading, CourseInput } from "../../../../components";
import SomeOtherInfos from "./SomeOtherInfos";

export default function BasicInfo() {
  const { common_id, subject_common_id } = useParams()

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { subjects, getCourse } = useCourseContext();
  useEffect(()=>{
    setLoading(true);
    if(subjects) {
      const sub = subjects?.cur?.find(
        sub=>sub?.cur?.common_id === subject_common_id
      )
      // handle not found error ?
      // if(!sub) 
      setData(sub);
      setLoading(false);
    }
    else getCourse(common_id);
    // eslint-disable-next-line 
  }, [subjects])

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
      <SomeOtherInfos />
    </div>
  )
}
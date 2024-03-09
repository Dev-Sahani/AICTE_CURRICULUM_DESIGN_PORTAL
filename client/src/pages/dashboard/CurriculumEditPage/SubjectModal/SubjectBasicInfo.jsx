import { useState, useEffect } from "react";
import { useCourseContext } from "../../../../context";
import { useParams } from "react-router-dom";
import { Loading } from "../../../../components";

export default function BasicInfo() {
  const { common_id, subject_common_id } = useParams()

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const { subjects, getCourse } = useCourseContext();
  console.log(subjects, data)

  useEffect(() => {
    if(subjects === undefined){
      console.log("setting loading")
      setLoading(true)
      getCourse().then((res)=>setLoading(false));
    }
    setData(subjects?.cur?.find(
      el => el?.cur.common_id === subject_common_id
    ))
    //eslint-disable-next-line
  }, [])

  if(loading)return <Loading count={5} />

  return (
    <div>
      Basic Info 
      {data?.cur && Object.keys(data?.cur).map(key=>{
        if(["common_id", "id", "_id", "version"].includes(key))return ;
        return <div 
          className="flex justify-evenly"
          key={key}
        >
          <p>{key}</p>
          <p>{data.cur[key]}</p>
        </div>
      })}
    </div>
  )
}
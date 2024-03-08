import { useParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Modal } from "../../../../components";
import { useCourseContext } from "../../../../context";
import { useEffect, useState } from "react";
import SharedLayout from "./SharedLayout"
import SubjectBasicInfo from "./SubjectBasicInfo"
import SubjectSyllabus from "./SubjectSyllabus"
import SubjectResources from "./SubjectResources"

export default function SubjectModal() {
  const {common_id, subject_common_id} = useParams()
  
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const {subjects} = useCourseContext();

  useEffect(()=>{
    setData(subjects?.cur?.find(
      el=>el?.cur.common_id === subject_common_id
    )?.cur)
  //eslint-disable-next-line
  },[])
  
  const location = useLocation();
  const navigate = useNavigate();

  const onClose = ()=>{
    const [before, after] = location.pathname.split(common_id);
    let path;
    if(after.startsWith("/categories")){
      path = "categories"
    }
    else if(after.startsWith("/semesters")){
      path = "semesters"
    }
    else if(after.startsWith("/subjects")){
      path = "subjects"
    }
    navigate(`${before + common_id}/${path}`)
  }
   
  return (
  <Modal onClose={onClose}>
      <SharedLayout className="grow" data={data}>
        <Outlet />
      </SharedLayout>
  </Modal>
  )
}

export {
  SubjectBasicInfo,
  SubjectSyllabus,
  SubjectResources,
}
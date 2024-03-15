import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import { Modal } from "../../../../components";
import SharedLayout from "./SharedLayout"
import SubjectBasicInfo from "./SubjectBasicInfo"
import SubjectSyllabus from "./SubjectSyllabus"
import SubjectResources from "./SubjectResources"

export default function SubjectModal() {  
  const {common_id} = useParams();
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
      <SharedLayout className="grow" currentPath={location.pathname}>
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
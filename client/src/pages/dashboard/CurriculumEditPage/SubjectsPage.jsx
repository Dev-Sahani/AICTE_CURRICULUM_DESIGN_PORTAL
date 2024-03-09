import { useEffect,useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Table, Loading } from "../../../components"
import SubjectsFilter from "./SubjectsFilter"
import { useCourseContext } from "../../../context";

export default function SubjectPage() {
  const { common_id } = useParams();
  const { subjects, getCourse } = useCourseContext();
  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
  const [ allSubjects, setAllSubjects] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(()=>{
    if(!subjects) {
      getCourse(common_id);
    }
    else {
      setAllSubjects(subjects.cur || []);
      setLocalLoading(false);
    }

  // eslint-disable-next-line
  }, [subjects])

  if(localLoading) {
    return (
      <>
        <Loading count={4} containerClassName="m-10 p-8 bg-gray-100 rounded-3xl" cardClassName="!h-12"/>
        <Loading count={4} containerClassName="m-10 p-8 bg-gray-100 rounded-3xl" cardClassName="!h-12"/>
      </>
    )
  }

  return (
    <>
      <SubjectsFilter localSubjects={allSubjects} setLocalSubjects={setAllSubjects} />
      <Table
        data={allSubjects}
        keys={keyOrder}
        secondaryHeader={true}
      />

      <Outlet />
    </>
  )
}
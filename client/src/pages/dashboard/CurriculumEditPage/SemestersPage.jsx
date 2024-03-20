import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AddSubject, 
  Table,
  CardWrapper, 
  Loading, 
} from "../../../components"
import { useCourseContext } from "../../../context";

export default function SemestersPage() {
  const { common_id } = useParams();
  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
  const { getSemestersWiseSub } = useCourseContext();

  const [semesters, setSemesters] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [semester, setSemester] = useState(undefined);
  
  useEffect(()=>{
    getSemestersWiseSub(common_id)
      .then((res)=>{
        if(res) {
          // console.log(res);
          setSemesters(res?.data?.semesters);
        }
      })
      .catch(err => {
        // handle error
      })
      .finally(()=>{
        setLocalLoading(false);
      })
  // eslint-disable-next-line
  },[])

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
    {
      Object.keys(semesters || {}).map((semester, index)=>{
        const totalCredits = semesters[semester].reduce(
          (credits, item) => {
            if(!item || !item.cur || !item.cur.credits) return credits;
            return credits + item.cur.credits; 
          },
          0,
        )
        return (
          <CardWrapper classNames="m-8 p-6 pt-2" key={index}>
              <header className="mx-2 flex justify-between items-center text-gray-900">
                <h1 className="inline text-base">
                  {`${index + 1}.`}
                </h1>
                <h1 className="inline text-2xl font-semibold">
                  {`Semester-${semester}` || "-----"}
                </h1>
                <h1 className="inline text-base">
                  {`Credits-${totalCredits}`}
                </h1>
              </header>

              <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
              
              <Table
                data={semesters[semester] || []}
                keys={keyOrder}
                setLoading={setLocalLoading}
              />
              <div className="mt-4 w-full flex justify-end text-white">
                <button className="bg-secondary-500 py-1.5 px-2.5 rounded" onClick={()=>{setShowAddStudent(true); setSemester(semester)}}>
                  Add Subject
                </button>
              </div>
          </CardWrapper>
        )
      })
    }
    {
      showAddStudent && 
      <AddSubject 
        id={common_id}
        name="subjects"
        inputFields={[
          {type: "text", title: "code",}, 
          {type: "text", title: "title",},
          {type: "text", title: "category",},
          {type: "number", title: "semester", defaultValue: semester},
          {type: "number", title: "l",},
          {type: "number", title: "t",},
          {type: "number", title: "p",},
          {type: "text", title: "credits",},
          {type: "text", title: "weeklyHours",},
        ]}
        onClose={()=>setShowAddStudent(false)} 
      />
    }

    {/* Subject Modal */}
    <Outlet />
    </>
  )
}

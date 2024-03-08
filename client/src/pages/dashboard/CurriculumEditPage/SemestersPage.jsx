import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
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
              <header className="mx-2 flex justify-between">
                <h1 className="inline text-3xl">
                  {`${index + 1}.`}
                </h1>
                <h1 className="inline text-xl">
                  {`Semester-${semester}` || "-----"}
                </h1>
                <h1 className="inline text-lg">
                  {`Credits-${totalCredits}`}
                </h1>
              </header>

              <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
              
              <Table
                data={semesters[semester] || []}
                keys={keyOrder}
              />
          </CardWrapper>
        )
      })
    }

    {/* Subject Modal */}
    <Outlet />
    </>
  )
}

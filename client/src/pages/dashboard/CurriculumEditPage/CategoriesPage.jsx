import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AddSubject, 
  CardWrapper,
  Table, 
  Loading,
  SecondaryButton, 
} from "../../../components"
import { useCourseContext } from "../../../context";


export default function CategoriesPage() {
  const {common_id} = useParams();
  const { getCategoriesWiseSub } = useCourseContext();

  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
  const [categories, setCategories] = useState({});
  const [localLoading, setLocalLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(()=>false);
  const [newSubjectCategory, setNewSubjectCategory] = useState(undefined);

  useEffect(()=>{
    getCategoriesWiseSub(common_id)
      .then((res)=>{
        if(res) {
          // console.log(res);
          setCategories(res?.data?.categories)
        }
      })
      .catch(err=>{
        // Handle error
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
    <div>
      <div>
      {
        Object.keys(categories || {})?.map((category, index)=>{
          const totalCredits = categories[category].reduce(
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
                  {`${index + 1}`}
                </h1>
                <h1 className="inline text-2xl font-semibold">
                  {category || "-----"}
                </h1>
                <h1 className="inline text-base">
                  {`Credits-${totalCredits}`}
                </h1>
              </header>

              <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
              
              <Table
                data={categories[category] || []}
                keys={keyOrder}
                setLoading={setLocalLoading}
              />


              <div className="mt-5 w-full flex justify-end items-center gap-4">
                <SecondaryButton onClick={()=>{setShowAddStudent(true); setNewSubjectCategory(category)}} className="mr-1 p-2 bg-secondary-500">
                  Add Subject
                </SecondaryButton>
              </div>
            </CardWrapper>
          )
        })
      }
      </div>
      <div>        
        {
          showAddStudent && 
          <>
          <h1>Hello World</h1>
          <AddSubject 
            id={common_id}
            name="subjects"
            onClose={()=>setShowAddStudent(false)}
            inputFields={[
              {type: "text", title: "code",}, 
              {type: "text", title: "title",},
              {type: "text", title: "category", defaultValue: newSubjectCategory},
              {type: "number", title: "semester",},
              {type: "number", title: "l",},
              {type: "number", title: "t",},
              {type: "number", title: "p",},
              {type: "text", title: "credits",},
              {type: "text", title: "weeklyHours",},
            ]}
          />
          </>
        }
      </div>
      {/* Subject Modal */}
      <Outlet />
    </div>
  )
}

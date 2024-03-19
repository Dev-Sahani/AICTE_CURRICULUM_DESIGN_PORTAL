import { useState } from "react";
import { useCourseContext } from "../../context";
import { CourseMultiInput, Label, SecondaryButton, AddSubject } from ".."; 
import { useParams } from "react-router-dom";

export default function AddCourseInput({ propertyName, className, propertyKeys, heading }) 
{
  const {[propertyName]: propertyValue} = useCourseContext();
  const { common_id } = useParams();
  const [showAddProperty, setShowAddProperty] = useState(false);

  if(!propertyValue || !propertyValue.cur || !Array.isArray(propertyValue.cur)) return <div>Some Error</div>;
  heading = heading || propertyName.split(/(?=[A-Z])/).join(" ");

  return (
    <div className="mt-6">
      <header className="flex justify-between items-center mt-2">
        <Label large breakLine className="w-auto capitalize">{heading}</Label>
        <SecondaryButton onClick={()=>setShowAddProperty(true)}>
          Add new +
        </SecondaryButton>
      </header>

      <main className={className}>
        {
          propertyValue.cur.map((item, index)=>{
            return <div key={index} className="relative my-2">
              {
                <CourseMultiInput name={propertyName} subNames={propertyKeys} index={index} />
              }
            </div>
          })
        }

        {
          showAddProperty &&
          <AddSubject
            onClose={()=>setShowAddProperty(false)}
            id={common_id}
            name={propertyName}
            inputFields={
              propertyKeys.map((item)=>{
                return {title: item, type: "text"}
              })
            }
            modalClassName="!h-[16rem] !w-[32rem]"
            loadingCount = {2}
          />
        }
      </main>
    </div>
  )
}

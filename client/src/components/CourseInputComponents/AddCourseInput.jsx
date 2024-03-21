import { useState } from "react";
import { useCourseContext } from "../../context";
import { CourseMultiInput, Label, SecondaryButton, AddSubject, NewAndDeleteProperty } from ".."; 
import { useParams } from "react-router-dom";

export default function AddCourseInput({ propertyName, className, propertyKeys, heading }) 
{
  const {[propertyName]: propertyValue} = useCourseContext();
  const { common_id } = useParams();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showDelted, setShowDeleted] = useState(false);
  const [showNewAndDeletedValues, setShowNewAndDeletedValues] = useState(false);

  if(!propertyValue || !propertyValue.cur || !Array.isArray(propertyValue.cur)) return <div>Some Error</div>;
  heading = heading || propertyName.split(/(?=[A-Z])/).join(" ");

  return (
    <div className="mt-6">
      <header className="flex justify-between items-center mt-2">
        <Label large breakLine className="w-auto capitalize">{heading}</Label>
        <div className="flex gap-2">
          <SecondaryButton onClick={()=>setShowAddProperty(true)} className="!px-2 !py-1">
            Add new +
          </SecondaryButton>
          <SecondaryButton className="!bg-accent-500 !px-2 !py-1" onClick={()=>setShowNewAndDeletedValues(prev=>!prev)}>
            New and Deleted values
          </SecondaryButton>
        </div>
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
        {
          showDelted &&
          <AddSubject
            onClose={()=>setShowDeleted(false)}
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

      {
        showNewAndDeletedValues && 
        <NewAndDeleteProperty onClose={()=>setShowNewAndDeletedValues(false)} propertyName={propertyName} />
      }
    </div>
  )
}

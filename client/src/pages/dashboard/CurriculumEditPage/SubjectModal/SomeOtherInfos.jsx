import { useEffect, useState } from 'react'
import { useSubjectContext } from "../../../../context";
import { useParams } from "react-router-dom";
import { Loading, SubjectMultiInput } from '../../../../components';
import { AddPropertyValueModal, NewValuesModal } from '../../../../components/SubjectInput';

export default function SomeOtherInfos() {
  const { getSubject, subject } = useSubjectContext();
  const { subject_common_id } = useParams();

  const [data, setData] = useState();
  const [showAddProperty, setShowAddProperty] = useState("");
  const [showNew, setShowNew] = useState("");
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(()=>{
    if(!subject || subject.common_id !== subject_common_id) {
      getSubject(subject_common_id)
        .then(res=>{
          if(!res || !res.data) 
          setData(res?.data)
        })
        .finally(()=>{
          setLocalLoading(false);
        })
      }
      else {
        setData(subject);
        setLocalLoading(false);
      }
    // eslint-disable-next-line
  }, [subject]);

  if(localLoading) {
    return <Loading count={3} cardClassName="!h-12" />
  }
  return (
    <>
      {
        data &&
        Object.keys(data).map((propertyName, index)=>{
          if(["common_id", "id", "_id", "version", "title", "modules", "experiments", "referenceMaterial", "courseId"].includes(propertyName)) 
            return null;  
          if(!subject || !subject[propertyName]) return null;
          
          return (
            <div className="w-full" key={propertyName}>
              <div className='w-full pr-2 flex justify-between'>
                <h1 className={`px-2 ${index===1 ? "mt-4" : "mt-2"} capitalize`}>
                  {propertyName}
                </h1>
                <div className='flex gap-2 items-center'>
                  <button className='max-h-8 bg-secondary-500 px-2 py-px rounded text-white' onClick={()=>setShowAddProperty(propertyName)}>
                    Add +
                  </button>
                  {
                    showAddProperty === propertyName &&
                    <AddPropertyValueModal propertyName={propertyName} setShowModal={setShowAddProperty}/>
                  }
                  {
                    subject[propertyName]?.add && subject[propertyName].add.length > 0 && 
                    <button className='max-h-8 bg-accent-500 px-2 py-px rounded text-white' onClick={()=>setShowNew(propertyName)}>
                      New
                    </button>
                  }
                  {
                    showNew === propertyName && 
                    <NewValuesModal propertyName={propertyName} setShowNew={setShowNew} />
                  }
                </div>
              </div>
              <SubjectMultiInput name={propertyName} /> 
            </div>
          )
        })
      }
    </>
  )
}

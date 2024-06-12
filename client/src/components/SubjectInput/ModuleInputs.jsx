import { useEffect, useState } from 'react';
import { useSubjectContext } from '../../context';
import { Module, Loading } from "..";
import { useParams } from "react-router-dom";

export default function ModuleInput() {

  const { getSubject, subject } = useSubjectContext();
  const { subject_common_id } = useParams();

  const [data, setData] = useState(subject?.modules);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(()=>{
    setLocalLoading(true);
    
    if(!subject || subject_common_id !== subject.common_id) {

      getSubject(subject_common_id)
        .then(res => {
          if(!res || !res.data) return;
          setData(res.data.modules);
        })
        .finally(()=>{
          setLocalLoading(false);
        })
      }
      else {
        setData(subject?.modules);
        setLocalLoading(false);
      }
    // eslint-disable-next-line
  }, [subject]);


  if(localLoading) {
    return <Loading count={6} cardClassName="!h-12" />
  }

  return (
    <div className='w-full flex flex-col gap-4 p-3 py-4'>
      {
        data?.cur?.map((module, index)=> 
          <Module 
            module={module}
            index={index}
            key={index}
          />
        )
      }
    </div>
  )
}

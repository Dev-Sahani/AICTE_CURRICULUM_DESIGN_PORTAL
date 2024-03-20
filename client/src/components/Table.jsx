import { Link, useParams } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";
import { useState } from "react";
import { Loading }  from "./"

export default function Table({data, newData=[], keys, primaryHeader=true, secondaryHeader=false, to}) {
  const { subjects, deleteProperty } = useCourseContext();
  const { common_id } = useParams();
  const [loadingIndex, setLoadingIndex] = useState(-1);
  if(!data || !keys || !Array.isArray(keys)) return <div>Data is not passed</div>;

  const rowClasses = "w-full py-2 px-2 lg:px-6 xl:px-10 text-center bg-accent-400"
  const handleDelete = async(index, subjectId) => {
    setLoadingIndex(index);
    let actualIndex;
    subjects.cur.find((sub, indx)=>{
      if(sub?.cur?.common_id === subjectId) 
        actualIndex = indx; 
      return sub?.cur?.common_id === subjectId;
    })
    await deleteProperty("subjects", actualIndex, common_id);
    setLoadingIndex(-1);
  }

  return (
    <div className="w-full flex justify-center items-center">
      {
        [...keys, "-" ].map((value, indx)=>{
          const classes = `
            ${rowClasses} 
            ${indx===0 && " rounded-l-full "} 
            ${value==="-" && "rounded-r-full !w-fit !px-3"}
          `

          return (
            <div className={`w-full flex flex-col ${value==="-" ? "items-start" : "items-center"} justify-between whitespace-nowrap`} key={indx}>
              <header className={`${secondaryHeader ? `text-center text-white bg-primary-700 p-2` : "text-primary-500"} ${value==="-" ? "w-fit px-5" : "w-full"} text-lg font-semibold capitalize`}>
                <h2 className={`${value==="-" && "text-transparent"} text-center`}>{value}</h2>
              </header>
              
              <main className={`w-full flex flex-col ${value==="-" ? "items-start" : "items-center"} gap-2 mt-2`}>
                {
                  data?.map((item, ind)=>{
                    let innerContent = "-"
                    if(item && item.cur && item.cur[value]) 
                      innerContent = item.cur[value];
                    
                    return (
                      ind === loadingIndex 
                      ?
                      <Loading count={1} cardClassName="!h-10" key={ind} />
                      :
                      (
                        value === "-" 
                        ?
                        <button className={classes} key={ind} onClick={()=>handleDelete(ind, item?.cur?.common_id)}>
                          <img src="/deleteButton.png" className="h-6 min-w-6" alt="delete" /> 
                        </button>
                        : 
                        <Link key={ind} to={`${item.cur?.common_id}`} className={classes}>
                          { innerContent }
                        </Link> 
                      )
                    )
                  })
                }
                {/* {
                  newData.map(({value: item, by}, ind)=>{

                    <Link key={ind} to={`${item?.common_id}`} className={classes}>
                      { item[value] }
                    </Link> 
                  })
                } */}
              </main>
            </div>
          )
        })
      }
    </div>
  )
}
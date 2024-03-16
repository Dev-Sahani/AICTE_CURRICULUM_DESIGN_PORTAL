import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourseContext } from "../../../../context";
import { Loading } from "../../../../components";

export default function SharedLayout({ className, children, currentPath }) {
  const {common_id, subject_common_id} = useParams()
  
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const {subjects, getCourse} = useCourseContext();

  useEffect(()=>{
    setLoading(true);
    if(subjects) {
      const sub = subjects?.cur?.find(
        sub=>sub?.cur?.common_id === subject_common_id
      )
      // handle not found error ?
      // if(!sub) 
      setData(sub?.cur);
      setLoading(false);
    }
    else getCourse(common_id);
  //eslint-disable-next-line
  },[subjects])

  if(loading) {
    return (
      <div>
        <div><Loading count={1} cardClassName="!h-12" /></div>
        <div className="flex">
          <div className="basis-[20%]">
            <Loading count={3} cardClassName="!h-12" />
          </div>
          <div className=""></div>
        </div>
      </div>
    )
  }
  return (
    <div className={"flex flex-col h-full w-full p-2 " + className}>
      {/* Upper Header */}
      <header className="m-2 flex justify-between items-end w-full ">
        <h1 className="ml-2 inline text-xl text-gray-500">
          {data?.code}
        </h1>
        <h1 className="inline text-2xl text-primary-500 font-semibold">
          {data?.title}
        </h1>
        <h1 className="mr-16 inline text-xl text-gray-500">
          {data?.credits}C
        </h1>
      </header>

      <hr className="border-t-2 border-gray-400 mb-3 mx-2" />

      <div className="flex gap-2 grow">
        {/* Side NavBar */}
        <nav className="flex flex-col w-40">
          <ul className="flex flex-col gap-2 px-2 pt-1 text-center text-white">
            <Link to="">
              <li className={`${!["syllabus", "resources"].some(char => currentPath.endsWith(char)) ? "bg-primary-700" : "bg-primary-500"} rounded-lg p-2 text-base`}>Basic Info</li>
            </Link>
            <Link to="syllabus" >
              <li className={`${currentPath.endsWith("syllabus") ? "bg-primary-700" : "bg-primary-500"} rounded-lg p-2 text-base`}>Modules</li>
            </Link>
            <Link to="resources" >
              <li className={`${currentPath.endsWith("resources") ? "bg-primary-700" : "bg-primary-500"} rounded-lg p-2 text-base`}>Resources</li>
            </Link>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="h-[29rem] grow bg-white rounded-xl overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
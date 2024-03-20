// import {
//     FilterSearch,
//     FilterDropdown,
// } from "../../../components";

import { useState } from "react"
import { useCourseContext } from "../../../context";
import Search from "../../../assets/Search.png";
import { SecondaryButton, AddSubject } from "../../../components";
import { useParams } from "react-router-dom";

export default function SubjectsFilter({localSubjects, setLocalSubjects}) {
  const { subjects } = useCourseContext();
  const { common_id } = useParams();
  const [search, setSearch] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  
  if(!localSubjects || !setLocalSubjects) return <div>Error in filter</div>

  const handleChange = (e)=>{
    const re = new RegExp(`^${e.target.value}`, 'i')
    setLocalSubjects((prev)=>{
      if(subjects && subjects.cur && Array.isArray(subjects.cur)) {
        prev = subjects.cur.filter((item)=>{
          // if(!item || !item.cur || !item.cur.title || !item.cur.code) return false;
          return re.test(item?.cur?.title) || re.test(item?.cur?.code)
        })
      }
      return prev;
    })
    setSearch(e.target.value);
  }

  return (
    <nav className="w-full flex justify-evenly my-2 mb-6">
      <div className="h-fit flex items-center border border-primary-500">
        <img src={Search} alt="search" className="bg-white w-8 h-8"/>
        <input 
          name="title"
          value={search}
          type="text"
          className="w-[30vw] p-1 pr-2 outline-none"
          placeholder="Search Subject"
          onChange={handleChange}
        />
      </div>

      <SecondaryButton onClick={()=>{setShowAddSubject(true)}}>
        Add Subject
      </SecondaryButton>

      {
        showAddSubject && 
        <AddSubject
          id={common_id}
          name="subjects"
          inputFields={[
            {type: "text", title: "code",}, 
            {type: "text", title: "title",},
            {type: "text", title: "category",},
            {type: "number", title: "semester"},
            {type: "number", title: "l",},
            {type: "number", title: "t",},
            {type: "number", title: "p",},
            {type: "text", title: "credits",},
            {type: "text", title: "weeklyHours",},
          ]}
          onClose={()=>setShowAddSubject(false)}
        />
      }
    </nav>
  )
}

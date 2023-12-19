import { Table } from "../../../components"
import SubjectsFilter from "./SubjectsFilter"

export default function SubjectPage() {
  const convertion = getSubjects();
  return (
    <>
      <SubjectsFilter />
      <Table
        primaryHead
        data={convertion}
      />
    </>
  )
}

const getSubjects = ()=>{
    const subjects = [
      {
        code: "evw32",
        title: "jfla",
        semester:2,
        l:1,
        t:2,
        p:1,
        credits: 2
      }, {
        code: "evw32",
        title: "jfla",
        semester:2,
        l:1,
        t:2,
        p:1,
        credits: 2
      }, {
        code: "evw32",
        title: "jfla",
        semester:2,
        l:1,
        t:2,
        p:1,
        credits: 2
      },
    ]
    const convertion = subjects.map((sub)=>
      [sub.code, sub.title, sub.semester, sub.l, sub.t, sub.t, sub.credits]
    )
    convertion.unshift(["Code", "Subject Name", "Semester", "L","T","P", "Credits"])
    
    return convertion;
}
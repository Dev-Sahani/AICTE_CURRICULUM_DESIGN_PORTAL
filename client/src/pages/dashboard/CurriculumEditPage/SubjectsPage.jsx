import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from "../../../components"
import SubjectsFilter from "./SubjectsFilter"
import { useCourseContext } from "../../../context";

export default function SubjectPage() {
  const {common_id} = useParams();
  const { getAllSubjects } = useCourseContext();
  const [subjects, setSubjects] = useState([]);
  const keys = ["code", "title", "semester", "l", "t", "p", "credits"];

  useEffect(()=>{
    const data = async()=>{
      const res = await getAllSubjects(common_id);
      return res;
    }
    data().then((res)=>{
      if(res) {
        // console.log(res);
        console.log(res);
        setSubjects(res.data)
      }
    });
  },[])

  return (
    <>
      <SubjectsFilter />
      <Table
        primaryHead
        data={subjects}
        head={keys}
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
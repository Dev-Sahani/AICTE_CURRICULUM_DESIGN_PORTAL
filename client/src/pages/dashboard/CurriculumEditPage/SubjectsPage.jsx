// import { useParams } from "react-router-dom";
import { 
  useState, 
  // useEffect, 
} from "react";
import { Table } from "../../../components"
import SubjectsFilter from "./SubjectsFilter"
import { useCourseContext } from "../../../context";

export default function SubjectPage() {
  // const {common_id} = useParams();
  const { subjects } = useCourseContext();
  console.log(subjects)
  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
  const [ allSubjects, setAllSubjects] = useState(converIntoArray(subjects?subjects:[], keyOrder));
  // setSubjects(converIntoArray(subjects, keyOrder));

  // useEffect(()=>{
  //   const data = async()=>{
  //     const res = await getAllSubjects(common_id);
  //     return res;
  //   }
  //   data().then((res)=>{
  //     if(res) {
  //       // console.log(res);
  //       console.log(res);
  //       setSubjects(res.data)
  //     }
  //   });
  // },[])
  // console.log(allSubjects); 
  return (
    <>
      <SubjectsFilter />
      <Table
        primaryHead
        data={allSubjects}
        head={keyOrder}
      />
    </>
  )
}

// const getSubjects = ()=>{
//     const subjects = [
//       {
//         code: "evw32",
//         title: "jfla",
//         semester:2,
//         l:1,
//         t:2,
//         p:1,
//         credits: 2
//       }, {
//         code: "evw32",
//         title: "jfla",
//         semester:2,
//         l:1,
//         t:2,
//         p:1,
//         credits: 2
//       }, {
//         code: "evw32",
//         title: "jfla",
//         semester:2,
//         l:1,
//         t:2,
//         p:1,
//         credits: 2
//       },
//     ]
//     const convertion = subjects.map((sub)=>
//       [sub.code, sub.title, sub.semester, sub.l, sub.t, sub.t, sub.credits]
//     )
//     convertion.unshift(["Code", "Subject Name", "Semester", "L","T","P", "Credits"])
    
//     return convertion;
// }

const converIntoArray = (array, keyOrder) => {
  const arr = [];
  array.forEach((item, index)=>{
    arr.push([]);
    for(let k of keyOrder) {
      arr[index].push(item[k]);
    }
  })
  return arr;
}
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  CardWrapper
} from "../../../components"
import { useCourseContext } from "../../../context";

export default function SemestersPage() {
  const { common_id } = useParams();
  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
  const { getSemestersWiseSub } = useCourseContext();

  const [semesters, setSemesters] = useState([]);

  useEffect(()=>{
    const data = async()=>{
      const res = await getSemestersWiseSub(common_id);
      return res;
    }
    data().then((res)=>{
      if(res) {
        // console.log(res);
        setSemesters(convertIntoArray(res.data.semesters, keyOrder))
      }
    });
  // eslint-disable-next-line
  },[])

  return (
    <>
      {
      semesters.map((semester, index)=>{
        return (
          <CardWrapper classNames="m-8 p-6 pt-2">
            <header className="mx-2 flex justify-between">
              <h1 className="inline text-3xl">
                {`${index}.`}
              </h1>
              <h1 className="inline text-xl">
                {`Semester ${semester.title}`}
              </h1>
              <h1 className="inline text-lg">
                {`Credits ${
                  semester.subjects.reduce((acc, curr)=>acc + curr.credits, 0)
                }`}
              </h1>
            </header>
            <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
            <Table
              data={
                semester.subjects.map((sub)=>{
                  return keyOrder.map((key)=>{
                    if(!sub[key]) return Math.round(Math.random()*3)
                    return sub[key];
                  })
                })
              }
              head={keyOrder}
            />
          </CardWrapper>
        )
      })
    }
    </>
  )
}
  
const convertIntoArray = (obj, head)=>{
  const keys = Object.keys(obj);
  const arr = [];
  for(let k of keys) {
    arr.push({
      title: k,
      subjects: obj[k],
    })
  }
  // if(head) arr.unshift({subjects: head});
  console.log("Array" ,arr);
  return arr;
}
    // const semesters = [
    //   {
    //     title: "I",
    //     subjects: [
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
    //   }
    // ]
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CardWrapper,
  Table
} from "../../../components"
import { useCourseContext } from "../../../context";


export default function CategoriesPage() {
  const {common_id} = useParams();
  const { getCategoriesWiseSub } = useCourseContext();

  const [categories, setCategories] = useState([]);
  const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];

  useEffect(()=>{
    const data = async()=>{
      const res = await getCategoriesWiseSub(common_id);
      return res;
    }
    data().then((res)=>{
      if(res) {
        // console.log(res);
        setCategories(convertIntoArray(res.data.categories, keyOrder))
      }
    });
  // eslint-disable-next-line
  },[])

  if(!categories) return <></>
  return (
    <>
      {
        categories.map((category, index)=>{
          console.log(category);
          return (
            <CardWrapper classNames="m-8 p-6 pt-2">
              <header className="mx-2 flex justify-between">
                <h1 className="inline text-3xl">
                  {`${index + 1}.`}
                </h1>
                <h1 className="inline text-xl">
                  {category.title}
                </h1>
                <h1 className="inline text-lg">
                  {`Credits ${
                    category.subjects.reduce((acc, curr)=>acc + curr.credits, 0)
                  }`}
                </h1>
              </header>
              <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
              <Table
                data={
                  category.subjects.map((sub, indx)=>{
                    // if(indx === 0) return sub;
                    return keyOrder.map((key)=>{
                      if(!sub[key]) return Math.round(Math.random()*3);
                      return sub[key];
                    })
                  })
                  // .unshift(["Code", "Subject Name", "Semester", "L","T","P", "Credits"])
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
  const arr = [];
  for(let key in obj) {
    arr.push({
      title: key,
      subjects: obj[key],
    })
  }
  // if(head) arr.unshift({subjects: head});
  console.log("Array" ,arr);
  return arr;
}
// const getRandomSubject = () => {
//   const randomCode = Math.random().toString(36).substring(7).toUpperCase().slice(0, 6);
//   const randomTitle = "Subject " + Math.floor(Math.random() * 1000);
//   const randomSemester = Math.floor(Math.random() * 8) + 1;
//   const randomLectures = Math.floor(Math.random() * 3) + 1;
//   const randomTutorials = Math.floor(Math.random() * 3);
//   const randomPracticals = Math.floor(Math.random() * 3);
//   const randomCredits = Math.floor(Math.random() * 3) + 1;

//   return {
//     title: randomTitle,
//     code: randomCode,
//     semester: randomSemester,
//     l: randomLectures,
//     t: randomTutorials,
//     p: randomPracticals,
//     credits: randomCredits,
//   };
// };

// const generateRandomCategories = () => {
//   const categories = [
//     {
//       title: "Humanities and Social Science",
//       subjects: Array.from({ length: 5 }, () => getRandomSubject()),
//     },
//     {
//       title: "Basic Sciences Courses",
//       subjects: Array.from({ length: 5 }, () => getRandomSubject()),
//     },
//     {
//       title: "Core Courses",
//       subjects: Array.from({length: 6}, ()=>getRandomSubject()),
//     }
//   ];

//   return categories;
// };


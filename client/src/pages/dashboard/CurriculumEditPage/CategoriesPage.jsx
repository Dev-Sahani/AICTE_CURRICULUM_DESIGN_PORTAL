import {
  CardWrapper,
  Table
} from "../../../components"
export default function CategoriesPage() {
  const categories = generateRandomCategories();
  const keyOrder = ["code", "subjectName", "semester", "l", "t", "p", "credits"];

  return (
    <>
      {
        categories.map((category, index)=>{
          return (
            <CardWrapper classNames="m-8 p-6 pt-2">
              <header className="mx-2 flex justify-between">
                <h1 className="inline text-3xl">
                  {`${index}.`}
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
                  category.subjects.map((sub)=>{
                    return keyOrder.map((key)=>{
                      return sub[key];
                    })
                  })
                  // .unshift(["Code", "Subject Name", "Semester", "L","T","P", "Credits"])
                }
              />
            </CardWrapper>
          )
        })
      }
    </>
  )
}

const getRandomSubject = () => {
  const randomCode = Math.random().toString(36).substring(7).toUpperCase().slice(0, 6);
  const randomTitle = "Subject " + Math.floor(Math.random() * 1000);
  const randomSemester = Math.floor(Math.random() * 8) + 1;
  const randomLectures = Math.floor(Math.random() * 3) + 1;
  const randomTutorials = Math.floor(Math.random() * 3);
  const randomPracticals = Math.floor(Math.random() * 3);
  const randomCredits = Math.floor(Math.random() * 3) + 1;

  return {
    title: randomTitle,
    code: randomCode,
    semester: randomSemester,
    l: randomLectures,
    t: randomTutorials,
    p: randomPracticals,
    credits: randomCredits,
  };
};

const generateRandomCategories = () => {
  const categories = [
    {
      title: "Humanities and Social Science",
      subjects: Array.from({ length: 5 }, () => getRandomSubject()),
    },
    {
      title: "Basic Sciences Courses",
      subjects: Array.from({ length: 5 }, () => getRandomSubject()),
    },
    {
      title: "Core Courses",
      subjects: Array.from({length: 6}, ()=>getRandomSubject()),
    }
  ];

  return categories;
};


import {
  Table,
  CardWrapper
} from "../../../components"
export default function SemestersPage() {
  const semesters = [
    {
      title: "I",
      subjects: [
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
    }
  ]
  const keyOrder = ["Code", "title", "semester", "l", "t", "p", "credits"];
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
            </header>a-
            <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4"/>
            <Table
              data={
                semester.subjects.map((sub)=>{
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
  
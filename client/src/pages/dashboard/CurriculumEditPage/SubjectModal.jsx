
export default function SubjectModal({ subjectId }) {
  return <div className="relative p-4 rounded-4xl">

    <button className="absolute top-right">x</button>
    
    <header className="mx-2 flex justify-between">
      <h1 className="inline text-3xl">
        {`${index + 1}.`}
      </h1>
      <h1 className="inline text-xl">
        {category.title}
      </h1>
      <h1 className="inline text-lg">
        {`Credits ${category.subjects.reduce((acc, curr) => acc + curr.credits, 0)
          }`}
      </h1>
    </header>
    <hr className="h-4 border-t-2 border-gray-400 mb-6 mx-4" />

  </div>
}
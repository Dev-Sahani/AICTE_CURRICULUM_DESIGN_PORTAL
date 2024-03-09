import { Link } from "react-router-dom";

export default function SharedLayout({ className, data, children }) {
  return (
    <div className={"flex flex-col h-full w-full p-2 " + className}>
      {/* Upper Header */}
      <header className="m-2 flex justify-between w-[75%] ">
        <h1 className="inline text-2xl">
          {data?.code}
        </h1>
        <h1 className="inline text-2xl">
          {data?.title}
        </h1>
        <h1 className="inline text-2xl">
          {data?.credits}C
        </h1>
      </header>

      <hr className="border-t-2 border-gray-400 mb-2 mx-4" />

      <div className="flex grow">
        {/* Side NavBar */}
        <nav className="flex flex-col w-40">
          <ul className="flex flex-col gap-2 px-2 py-8">
            <Link to="" >
              <li className="bg-secondary-400 rounded-lg p-2 text-base">Basic Info</li>
            </Link>
            <Link to="syllabus" >
              <li className="bg-secondary-400 rounded-lg p-2 text-base">Modules</li>
            </Link>
            <Link to="resources" >
              <li className="bg-secondary-400 rounded-lg p-2 text-base">Resources</li>
            </Link>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="grow bg-white rounded-xl ">
          {children}
        </div>
      </div>
    </div>
  )
}
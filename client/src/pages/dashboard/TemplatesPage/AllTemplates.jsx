import { useEffect } from "react";
import AddImage from "../../../assets/Add.png";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../context";

export default function AllTemplates({ templates, setTemplates }) {
  const { accessedCourses } = useUserContext();

  useEffect(() => {
    setTemplates(
      accessedCourses && Array.isArray(accessedCourses) ? accessedCourses : []
    );
    // eslint-disable-next-line
  }, [accessedCourses]);

  const CardsClasses =
    " bg-white border border-purple-100 rounded-lg transform transition-transform duration-300 hover:scale-[1.02] ";

  return (
    <div className="w-full grid grid-cols-2 my-4 gap-6 min-w-fit">
      <Link
        className={CardsClasses + " flex flex-col items-center justify-center"}
        to="/curriculum/new-template"
      >
        <img src={AddImage} alt="add_image" className="h-16 w-16" />
        <h1>Start with new Template</h1>
      </Link>
      {templates.map((template, index) => {
        return (
          <Link
            key={index}
            className={CardsClasses}
            to={`/curriculum/${template?.id}`}
          >
            <h1 className="text-xl-custom m-2 mb-0">{template?.title?.cur}</h1>
            <p className="text-xs mx-2 mb-2 text-gray-300">{template?.id}</p>
            <div className="flex text-xs">
              <div className="h-fit text-center bg-secondary-100 text-base-custom text-secondary-900 px-1.5 p-1 md:px-2 m-1 md:m-2 rounded-full">
                {template?.level?.cur}
              </div>
              <div className="h-fit text-center bg-purple-200 text-base-custom text-purple-800 px-1.5 p-1 md:px-2 m-1 md:m-2 rounded-full">
                {template?.program?.cur}
              </div>
            </div>
            <div className="mr-2 absolute top-1 right-1 text-gray-300">
              {template?.version}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import ExpandDown from "../../../assets/expand-down.png";
import Edit from "../../../assets/edit.png";
import EditResoursePage from "./EditResourcePage";

export default function Resources({ resource }) {
  const [expand, setExpand] = useState(false);
  const [editResource, setEditResource] = useState(false);

  const truncatedDescription =
    resource.description.length > 25 && !expand
      ? `${resource.description.substr(0, 25)}...`
      : resource.description;

  return (
    <li className="rounded-2xl overflow-hidden mx-1 my-2 flex flex-col w-full min-w-fit shadow text-base-custom">
      <div className="flex flex-row padding-custom-lg space-x-3 gap-2 md:gap-5 h-full bg-white shadow-sm transform transition-transform duration-300 hover:scale-[1.01]">
        <Link to={resource.url} className="hidden sm:block">
          <img
            src={resource.coverImageUrl}
            alt="book"
            className="flex shrink-0 h-full w-[90px] object-contain"
          />
        </Link>

        <div className="flex flex-col space-y-4 justify-between w-full">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row justify-between">
              {/* <div className='text-xl-custom font-medium leading-none'>{resource.subjectName}</div> */}
              <div className="flex flex-row space-x-2 ">
                <div className="rounded-2xl bg-[#F3FFC7] padding-custom font-medium text-[#5B8506] items-center justify-center content-center">
                  {resource.type}
                </div>
                <div className="rounded-2xl bg-[#FEDEEA] padding-custom font-medium text-[#F8186E] items-center justify-center">
                  {resource.title}
                </div>
              </div>
            </div>
            <div className=" text-medium">{resource.author}</div>
          </div>
          <div className="text-sm-custom">{truncatedDescription}</div>
        </div>
        <div className="flex gap-2 md:gap-4">
          <button onClick={() => setExpand((prev) => !prev)}>
            <img
              className={`hover:scale-110 transition-transform duration-500 ease-out icon-size-sm ${
                expand && "rotate-180"
              }`}
              src={ExpandDown}
              alt="down"
            />
          </button>
          <button 
            className="hidden md:block"
            onClick={() => setEditResource((prev) => !prev)}
          >
            <img className="hover:scale-110 icon-size" src={Edit} alt="edit" />
          </button>
        </div>
      </div>

      {editResource && (
        <EditResoursePage
          onClose={() => setEditResource(false)}
          resource={resource}
        />
      )}
    </li>
  );
}

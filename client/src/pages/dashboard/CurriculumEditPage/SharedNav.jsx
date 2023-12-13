import { Outlet } from "react-router-dom";
import { NavList } from "../../../components";
import ImageComponent from "../../../assets";

export default function SharedNav() {
  return (
    <div>
        <nav className="flex justify-between w-full">
            <NavList 
                list={tempList()}
                vertical={false}
            />
            <div className="flex gap-2">
                {tempList2().map((item, indx)=>{
                    return <div className="w-12 h-12 flex justify-center items-center">{item.innerHtml}</div>
                })}
            </div>
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
const tempList = ()=>{
    return ([
        {
            innerHtml: "Basic Info",
            to: "/curriculum/courseName",
        }, {
            innerHtml: "Categories",
            to: "/curriculum/courseName/categories",
        }, {
            innerHtml: "Subjects",
            to: "/curriculum/courseName/subjects",
        }, {
            innerHtml: "Semester",
            to: "/curriculum/courseName/semesters",
        }
    ])
}

const tempList2 = ()=>{
    return ([
        {
            innerHtml: <ImageComponent both="6" imageName="ChatBubbleImage" alt="Chat" />, 
        }, {
            innerHtml: <ImageComponent both="6" imageName="LogsImage" alt="Logs" />, 
        }, {
            innerHtml: <ImageComponent both="6" imageName="PersonAddImage" alt="grant-access" />,
        }, {
            innerHtml: <ImageComponent both="6" imageName="DownloadImage" alt="download" />,
        }
    ])
}
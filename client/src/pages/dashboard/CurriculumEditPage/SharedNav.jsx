import { Outlet } from "react-router-dom";
import { NavList } from "../../../components";
import ImageComponent from "../../../assets";
import {useParams }  from "react-router-dom";

export default function SharedNav() {
  const {common_id} = useParams();
  
  return (
    <div>
        <nav className="flex justify-between w-full">
            <NavList 
                list={tempList(common_id)}
                vertical={false}
            />
            <div className="flex gap-2">
                {tempList2().map((item, indx)=>{
                    return <div className="w-12 h-12 flex justify-center items-center">{item.innerHtml}</div>
                })}
            </div>
        </nav>
        <hr className="border-t border-gray-300 mb-4"/>
        <main className="w-full">
            <Outlet />
        </main>
    </div>
  )
}
const tempList = (common_id)=>{
    return ([
        {
            innerHtml: "Basic Info",
            to: `/curriculum/${common_id}`,
        }, {
            innerHtml: "Categories",
            to: `/curriculum/${common_id}/categories`,
        }, {
            innerHtml: "Subjects",
            to: `/curriculum/${common_id}/subjects`,
        }, {
            innerHtml: "Semester",
            to: `/curriculum/${common_id}/semesters`,
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
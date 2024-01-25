import { Outlet } from "react-router-dom";
import { NavList } from "../../../components";
import ImageComponent from "../../../assets";
import {useParams }  from "react-router-dom";
import ChatApp from "./chats/App";
import {useState} from "react";
import {motion} from "framer-motion";

export default function SharedNav() {
  const {common_id} = useParams();
  const [showChats, setShowChats] = useState(false);

  return (
    <div>
        <nav className="flex justify-between w-full">
            <NavList 
                list={tempList(common_id)}
                vertical={false}
            />
            <div className="flex gap-2">
                {tempList2(showChats, setShowChats).map((item, indx)=>{
                    return (
                    <div 
                        key={indx}
                        className="w-12 h-12 flex justify-center items-center hover:cursor-pointer" 
                        {...item}
                    >
                        {item.innerHtml}
                    </div>)
                })}
            </div>
        </nav>
        <hr className="border-t border-gray-300 mb-4"/>
        <main className="w-full">
            <Outlet />
        </main>
        <motion.div
            className="absolute bottom-0 right-[-40px] h-[98vh]"
            initial={{
                right: "-400px",
            }}
            animate={
                showChats? {
                    right: "0px",
                }: {
                    right: "-400px",
                }
            }
        >
            <ChatApp room={common_id} onClose={()=>setShowChats(false)} />
        </motion.div>
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
        },{
            innerHtml: "Semester",
            to: `/curriculum/${common_id}/semesters`,
        },{
            innerHtml: "Subjects",
            to: `/curriculum/${common_id}/subjects`,
        }
    ])
}

const tempList2 = (showChats, setShowChats)=>{
    return ([
        {
            work: "chats",
            innerHtml: <ImageComponent className="w-6 h-6" imageName="ChatBubbleImage" alt="Chat" />, 
            onClick: ()=>{setShowChats(!showChats)},
            onClose: ()=>setShowChats(false),
        }, {
            work: "logs",
            innerHtml: <ImageComponent className="w-6 h-6" imageName="LogsImage" alt="Logs" />, 
        },
        //  {
        //     work: "access",
        //     innerHtml: <ImageComponent className="w-6 h-6"  imageName="PersonAddImage" alt="grant-access" />,
        // }, 
        // {
        //     innerHtml: <ImageComponent className="w-6 h-6"  imageName="DownloadImage" alt="download" />,
        // }
    ])
}
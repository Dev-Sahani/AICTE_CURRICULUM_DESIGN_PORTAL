import { Link, Outlet } from "react-router-dom";
import { NavList, NavButton } from "../../../components";
import ImageComponent from "../../../assets";
import {useParams }  from "react-router-dom";
import ChatApp from "./chats/App";
import {useState} from "react";
import {motion} from "framer-motion";

export default function SharedNav() {
  const {common_id} = useParams();
  const [showChats, setShowChats] = useState(false);

  return (
    <div >
        <nav className="flex justify-between w-full">
            <NavList 
                list={tempList(common_id)}
                vertical={false}
            />
            <div className="flex gap-2">
                {tempList2(showChats, setShowChats, common_id).map((item, indx)=>{
                    return (
                    <div 
                        key={indx}
                        className="w-12 h-12 flex justify-center items-center hover:cursor-pointer" 
                        {...item}
                    >
                        {item.child}
                    </div>)
                })}
            </div>
        </nav>
        <hr className="border-t border-gray-300 mb-4"/>
        <main className="w-full relative">
            <Outlet />
        </main>
        <motion.div
            className="fixed top-[80px] right-0 h-[86vh] rounded-l-2xl bg-white border-solid border-8 border-primary-50"
            initial={{
                right: "0px",
            }}
            animate={
                showChats? {
                    right: "0px",
                }: {
                    right: "-3600px",
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
            child: "Basic Info",
            to: `/curriculum/${common_id}`,
        }, {
            child: "Categories",
            to: `/curriculum/${common_id}/categories`,
        },{
            child: "Semester",
            to: `/curriculum/${common_id}/semesters`,
        },{
            child: "Subjects",
            to: `/curriculum/${common_id}/subjects`,
        }
    ])
}

const tempList2 = (showChats, setShowChats,common_id)=>{
    return ([
        {
            work: "chats",
            child: <ImageComponent className="w-6 h-6" imageName="ChatBubbleImage" alt="Chat" />, 
            onClick: ()=>{setShowChats(!showChats)},
            onClose: ()=>setShowChats(false),
        }, {
            work: "logs",
            child: <Link to={`/curriculum/${common_id}/versions`}>
                <ImageComponent className="w-6 h-6" imageName="LogsImage" alt="Logs" />
            </Link>, 
        },
         {
            work: "users",
            child: <Link to={`/curriculum/${common_id}/users`}>
                <ImageComponent className="w-6 h-6"  imageName="PersonAddImage" alt="grant-access" />
            </Link>,
        }, 
        {
            child: <ImageComponent className="w-6 h-6"  imageName="DownloadImage" alt="download" />,
        }
    ])
}
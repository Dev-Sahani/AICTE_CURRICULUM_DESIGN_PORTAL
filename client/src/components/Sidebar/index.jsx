import { useState } from 'react';
import SmallSidebar from './SmallSidebar';
import BigSidebar from './BigSidebar';
import { AnimatePresence } from "framer-motion";

const Sidebar = ({className}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = ()=>{
    setShowSidebar(!showSidebar);
  }
  const content = [
    {
      name: "Course Templates",
      icon: "./../assets/DoubleArrow.png",
      link: "/",
    }, {
      name: "Explore",
      icon: "./../assets/DoubleArrow.png",
      link: "explore",
    }, {
      name: "Resources",
      icon: "./../assets/DoubleArrow.png",
      link: "resources",
    }, {
      name: "Drafts", 
      icon: "./../assets/DoubleArrow.png",
      link: "drafts",
    }, {
      name: "Analytics", 
      icon: "./../assets/DoubleArrow.png",
      link: "analytics",
    }, {
      name: "Notification", 
      icon: "./../assets/DoubleArrow.png",
      link: "notification",
    }, {
      name: "Your Profile",
      icon: "./../assets/DoubleArrow.png",
      link: "profile",
    },
  ];
  
  if(showSidebar) 
    return (
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={()=>null}
      >
        <BigSidebar className={className} content={content} toggleSidebar={toggleSidebar} />
      </AnimatePresence>
    );

  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={()=>null}
    >
      <SmallSidebar className={className} content={content} toggleSidebar={toggleSidebar} />
    </AnimatePresence>
  )
}

export default Sidebar;
import React from 'react'
import { useState } from 'react';
import DoubleArrow from "./../assets/DoubleArrow.png";
import SidebarList from './SidebarList';

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
  const arr = content.map((data) => {
    return <SidebarList data={data}/>
  });

  return (
    <div className={className + " overflow-hidden "} >
      <main  className="h-full relative min-w-full">
        <header className="w-full mb-4 h-8 relative hover:cursor-pointer" onClick={toggleSidebar}>
          <img 
            className="h-8  absolute top-0 right-0"
            src={DoubleArrow} 
            alt="Arrow"
          />
        </header>
        <div>
          {arr}
        </div>
        <footer className="absolute bottom-6 right-1">
          <div>Logout</div>
        </footer>
      </main>
    </div>
  );
}

export default Sidebar;
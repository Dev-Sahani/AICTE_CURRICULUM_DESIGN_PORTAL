import { useState } from "react";
import { motion } from "framer-motion";
import SidebarList from "./SidebarList";
import DoubleArrow from "./../assets/DoubleArrow.png";
import LogoutBtnSidebar from "./LogoutBtnSidebar";
import { breakPoints, SidebarContent } from "../utils/constants";
import classNames from "classnames";

const Sidebar = ({ className }) => {
  const [showSidebar, setShowSidebar] = useState(
    window.innerWidth <= breakPoints[2] ? false : true
  );
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const arr = loadData(showSidebar);

  const sectionClass = classNames(
    "h-full min-w-[20vw] lg:min-w-[18vw] xl:min-w-[16vw] bg-primary-50 rounded-tr-3xl",
    !showSidebar && "!min-w-fit"
  )

  const toogleButtonClass = classNames(
    "h-8 absolute top-1 right-[0.5px] hover:cursor-pointer",
    !showSidebar && "!rotate-180"
  )

  return (
    <motion.div
      className={className + " hidden md:block relative rounded-tr-3xl overflow-x-clip"}
      initial={{
        width: "50px",
      }}
      animate={{
        width: `${showSidebar ? "fit-content" : "50px"}`,
      }}
    >
      <section className={sectionClass}>
        <header className="w-full mb-4 h-8">
          <img
            className={toogleButtonClass}
            src={DoubleArrow}
            alt="Arrow"
            onClick={toggleSidebar}
          />
        </header>
        <div>{arr}</div>
        <footer className="absolute bottom-6 left-0 w-full">
          <LogoutBtnSidebar isOpen={showSidebar} />
        </footer>
      </section>
    </motion.div>
  );
};

function loadData(showSidebar) {
  const arr = SidebarContent.map((data, ind) => {
    data.color = "#04314D";
    return <SidebarList key={ind} data={data} isOpen={showSidebar} />;
  });

  return arr;
}

export default Sidebar;

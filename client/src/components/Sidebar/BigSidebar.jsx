import DoubleArrow from "./../../assets/DoubleArrow.png";
import SidebarList from '../SidebarList';
import { motion } from "framer-motion";

const BigSidebar = ({content, className, toggleSidebar}) => {
    const arr = content.map((data) => {
        return <SidebarList data={data}/>
      });
    const expand = {
        initial: {
            flexBasis: "3rem",
        },
        later: {
            flexBasis: "15rem",
            transition: {
                duration: 0.3,
                type: "easeIn",
            }
        },
        exit: {
            flexBasis: "15rem",
        }
    }
      return (
        <motion.div 
            className={className + " overflow-hidden "} 
            variants={expand}
            initial="initial"
            animate="later"
            exit="exit"
        >
          <main  className="h-full relative min-w-[15rem]">
            <header className="w-full mb-4 h-8 relative hover:cursor-pointer">
              <img 
                className="h-8  absolute top-0 right-0"
                src={DoubleArrow} 
                alt="Arrow"
                onClick={toggleSidebar}
              />
            </header>
            <div>
              {arr}
            </div>
            <footer className="absolute bottom-6 left-0">
              <SidebarList data={{
                name: "Log-out",
                icon: "../../assests/DoubleArrow.png",
                link: "",
              }} />
            </footer>
          </main>
        </motion.div>
      );
}

export default BigSidebar
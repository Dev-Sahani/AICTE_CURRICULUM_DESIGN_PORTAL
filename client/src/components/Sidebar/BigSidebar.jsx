import DoubleArrow from "./../../assets/DoubleArrow.png";
import SidebarList from '../SidebarList';
import { motion } from "framer-motion";

const BigSidebar = ({content, className, toggleSidebar}) => {
    const arr = content.map((data) => {
        data.color = "#04314D";
        return <SidebarList data={data}/>
      });
    const expand = {
        initial: {
            flexBasis: "3.5rem",
        },
        later: {
            flexBasis: "15rem",
            transition: {
                duration: 0.4,
                type: "easeIn",
            }
        },
        exit: {
            flexBasis: "15rem",
        }
    }
      return (
        <motion.div 
            className={className + " overflow-hidden relative rounded-tr-3xl "} 
            variants={expand}
            initial="initial"
            animate="later"
            exit="exit"
        >
          <main  className="h-full min-w-[15rem] bg-primary-50">
            <header className="w-full mb-4 h-8 relative hover:cursor-pointer">
              <img 
                className="h-8  absolute top-1 right-1"
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
                svg: (color="#F53D4C")=><svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 36C13.9333 36 13.3056 35.7389 12.7833 35.2167C12.2611 34.6944 12 34.0667 12 33.3333V14.6667C12 13.9333 12.2611 13.3056 12.7833 12.7833C13.3056 12.2611 13.9333 12 14.6667 12H24V14.6667H14.6667V33.3333H24V36H14.6667ZM29.3333 30.6667L27.5 28.7333L30.9 25.3333H20V22.6667H30.9L27.5 19.2667L29.3333 17.3333L36 24L29.3333 30.6667Z" fill={`${color}`}/>
                </svg>
                ,
                link: "",
                color: "#F53D4C",
              }} />
            </footer>
          </main>
        </motion.div>
      );
}

export default BigSidebar
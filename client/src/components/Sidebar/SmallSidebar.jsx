import DoubleArrow from "./../../assets/DoubleArrow.png";
import SidebarList from '../SidebarList';
import { motion } from 'framer-motion';

const SmallSidebar = ({content, className, toggleSidebar}) => {
    const arr = content.map((data) => {
        // data.name = null;
        return <SidebarList data={data}/>
    });
    
    const shrink = {
        initial: {
            flexBasis: "15rem",
        },
        later: {
            flexBasis: "3rem",
            transition: {
                duration: 0.5,
                type: "easeIn",
            }
        },
        exit: {
            flexBasis: "15rem",
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 25,
                stiffness: 500,               
            }
        }
    }
    return (
        <motion.div 
            className={className + " overflow-hidden relative "} 
            variants={shrink}
            initial="initial"
            animate="later"
            exit="exit"
        >
          <main  className="h-full min-w-[15rem]">
            <header className="w-full mb-4 h-8 hover:cursor-pointer">
              <img 
                className="h-8  absolute top-0 right-0"
                src={DoubleArrow} 
                alt="Arrow"
                onClick={toggleSidebar}
              />
            </header>
            <div className="min-w-full">
              {arr}
            </div>
            <footer className="absolute bottom-6 left-0 min-w-full">
              <SidebarList data={{
                name: null,
                icon: "../../assests/DoubleArrow.png",
                link: "",
              }} />
            </footer>
          </main>
        </motion.div>
      );
}

export default SmallSidebar
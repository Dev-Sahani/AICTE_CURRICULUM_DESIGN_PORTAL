import DoubleArrow from "./../../assets/DoubleArrow.png";
import SidebarList from '../SidebarList';
import { motion } from 'framer-motion';

const SmallSidebar = ({content, className, toggleSidebar}) => {
    const arr = content.map((data) => {
        data.color = "#04314D";
        return <SidebarList data={data}/>
    });
    
    const shrink = {
        initial: {
            flexBasis: "15rem",
        },
        later: {
            flexBasis: "3.5rem",
            transition: {
                duration: 0.5,
                type: "easeIn",
            }
        },
        exit: {
            // flexBasis: "3rem",
        }
    }
    return (
        <motion.div 
            className={className + " overflow-hidden relative rounded-tr-3xl"} 
            variants={shrink}
            initial="initial"
            animate="later"
            exit="exit"
        >
          <main  className="h-full min-w-[15rem] bg-primary-50">
            <header className="w-full mb-4 h-8 hover:cursor-pointer">
              <img 
                className="h-8  absolute top-1 right-1"
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
                svg: (color="#F53D4C")=><svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 36C13.9333 36 13.3056 35.7389 12.7833 35.2167C12.2611 34.6944 12 34.0667 12 33.3333V14.6667C12 13.9333 12.2611 13.3056 12.7833 12.7833C13.3056 12.2611 13.9333 12 14.6667 12H24V14.6667H14.6667V33.3333H24V36H14.6667ZM29.3333 30.6667L27.5 28.7333L30.9 25.3333H20V22.6667H30.9L27.5 19.2667L29.3333 17.3333L36 24L29.3333 30.6667Z" fill={`${color}`}/>
                </svg>
                ,
                link: "",
              }} />
            </footer>
          </main>
        </motion.div>
      );
}

export default SmallSidebar
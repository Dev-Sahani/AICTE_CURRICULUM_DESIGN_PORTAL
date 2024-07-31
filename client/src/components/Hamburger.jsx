import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoutBtnSidebar from "./LogoutBtnSidebar";

export default function Hamburger({ siteMapList }) {
  const [isOpen, setIsOpen] = useState(false);

  const togleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="block md:hidden">
      <button
        className="text-white p-2 focus:outline-none"
        onClick={togleIsOpen}
      >
        <div className="block relative cursor-pointer w-[45px] h-[22px] sm:h-[30px]">
          <input className="appearance-none hidden" type="checkbox" />

          <span
            className={
              "absolute w-[32px] sm:w-[36px] h-[3px] sm:h-[5px] bg-white rounded-2xl inline-block duration-300 ease-in  left-0 top-0" +
              (isOpen
                ? " !w-[32px] sm:!w-[42px] left-[3px] rotate-45 origin-top-left"
                : "")
            }
          />
          <span
            className={
              "absolute w-[32px] sm:w-[36px] h-[3px] sm:h-[5px] bg-white rounded-2xl inline-block duration-300 ease-in  left-0 top-[9px] sm:top-[12px]" +
              (isOpen ? " opacity-0 translate-x-[-20px]" : "")
            }
          />
          <span
            className={
              "absolute w-[32px] sm:w-[36px] h-[3px] sm:h-[5px] bg-white rounded-2xl inline-block duration-300 ease-in  left-0 bottom-0" +
              (isOpen
                ? " !w-[32px] sm:!w-[42px] bottom-[-3px] -rotate-45 origin-top-left"
                : "")
            }
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="w-screen h-[90vh] py-8 text-white flex flex-col items-center gap-4 absolute left-0 top-full bg-gradient-to-r from-primary-700 to-primary-400 z-10"
            variants={boxVariant}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit={{ y: -200, opacity: 0.5, transition: { duration: 0.2 } }}
          >
            {siteMapList.map((item, index) => (
              <motion.li variants={listVariant} key={index}>
                <Link
                  onClick={togleIsOpen}
                  className="!block w-full p-1 text-center text-lg sm:text-xl hover:text-secondary-500"
                  to={item.link}
                >
                  {item.svg}
                  {item.name}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={listVariant}>
              <LogoutBtnSidebar isOpen={isOpen} white />
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const boxVariant = {
  hidden: {
    y: "-200",
    opacity: 0.5,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const listVariant = {
  hidden: {
    x: 100,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "ease-out",
    },
  },
};

import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export default function SecondaryButton({children, to, onClick, className, disabled}) {
    return (
        <motion.button
            className={"bg-lime-500 text-white rounded-sm px-4 py-2 w-fit inline-block ".concat(className?className:" ")}
            whileHover={{scale: 1.04}}
            whileTap={{scale: 0.95}}
            onClick={onClick}
            disabled={disabled}
        >
            <Link to={to}>
                {children}
            </Link>
        </motion.button>
  )
}

import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export default function PrimaryButton({children, to, onClick, className}) {
    return (
        <motion.div
            className={"bg-primary-400 text-white rounded-sm px-4 py-[0.4rem] w-fit inline-block ".concat(className?className:" ")}
            whileHover={{scale: 1.04}}
            whileTap={{scale: 0.95}}
            onClick={onClick}
        >
            <Link to={to}>
                {children}
            </Link>
        </motion.div>
  )
}

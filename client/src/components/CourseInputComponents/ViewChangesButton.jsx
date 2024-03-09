import { useState } from "react"
import ChangesModal from "./ChangesModal";
import classNames from "classnames";

export default function ViewChangesButton({children, name, className}) {
  const [showModal, setShowModal] = useState(false);
  if(!name || name==="") return <div></div>;

  className = classNames(
    "px-2 py-1 bg-accent-500 rounded overflow-hidden text-white",
    className, 
  )
  return (
    <>
      <button 
        className={className}
        onClick={()=>setShowModal(!showModal)}
      >
        {children || "View Changes"}
      </button>
      { 
        showModal && 
        <ChangesModal name={name} onClose={()=>setShowModal(false)} />
      }
    </>
  )
}

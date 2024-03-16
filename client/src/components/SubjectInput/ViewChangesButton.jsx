import { useState } from "react"
import ChangesModal from "./ChangesModal";
import classNames from "classnames";

export default function ViewChangesButton({ name, index, className, showImage, showText, imageClassName }) {
  const [showModal, setShowModal] = useState(false);
  if(!name || name==="" || !index) return <div>Some Error</div>;

  className = classNames(
    "bg-accent-500 rounded overflow-hidden text-white",
    className, 
    {"px-2 py-1": !showImage},
  )
  return (
    <>
      <button className={className} onClick={()=>setShowModal(!showModal)}>
        {
          (showText || (!showText && !showImage))
          &&
          "View Changes"
        }
        {
          showImage &&
          <img src="/change.png" alt="changes" className={imageClassName} />
        }
      </button>
      { 
        showModal && 
        <ChangesModal name={name} index={index} onClose={()=>setShowModal(false)} />
      }
    </>
  )
}

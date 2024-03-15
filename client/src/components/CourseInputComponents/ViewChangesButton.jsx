import { useState } from "react"
import ChangesModal from "./ChangesModal";
import classNames from "classnames";

export default function ViewChangesButton({ name, subName, className, showImage, imageClassName }) {
  const [showModal, setShowModal] = useState(false);
  if(!name || name==="") return <div></div>;

  className = classNames(
    "bg-accent-500 rounded overflow-hidden text-white",
    className, 
    {"px-2 py-1": !showImage},
  )
  return (
    <>
      <button className={className} onClick={()=>setShowModal(!showModal)}>
        {
          showImage ?
          <img src="/change.png" alt="changes" className={imageClassName} />
          :
          "View Changes"
        }
      </button>
      { 
        showModal && 
        <ChangesModal name={name} subName={subName} onClose={()=>setShowModal(false)} />
      }
    </>
  )
}

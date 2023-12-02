import React from 'react'
import image from "../../assets/iitblogo.png"
import image2 from "../../assets/Fire.png"
import Explore1 from "./Explore1"
import Explore2 from "./Explore2"
import Explore4 from "./Explore4"
const ExplorePage = () => {
  return (
    <div>
    <Explore4 />
    <Explore2 images={image2} />
    <div className=' flex flex-row flex-wrap flex-start content-start w-[1050px] gap-4'>
      <Explore1   branch={"Computer Science Engineering "}  college={"IIT-Bombay"} images={image}  />
      <Explore1   branch={"Computer Science Engineering "}  college={"IIT-Bombay"} images={image}  />
      <Explore1   branch={"Computer Science Engineering "}  college={"IIT-Bombay"} images={image}  />
    </div>
   </div>
    )
}

export default ExplorePage;
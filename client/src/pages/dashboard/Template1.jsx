import React, { useState } from "react";
import Add from "../../assets/Add.png"
import Template2 from "./Template2"
import x from "react-dom"
import Template4 from "./Template4"
// import Template4 from "./Template4"
function Template1(){
  const [count,setcount]=useState([]);
  function set(){
   x.render(<Template4 />,document.getElementById("root"))
    // setcount(prevValue=>{
    //   return[...prevValue,""]
    // } )
  }
  // function call(){

  //  return  <Template2  subject={"Computer Science & Engineering"} about={content}/>

  //  }
  
  
  const content="Computer Science Engineering is a course that deals with the design, implementation, and management of information systems of both software and hardware processes."
return (
<div className= "flex flex-row  flex-wrap gap-[24px] w-[1054px]">
<div className='flex flex-col w-[513px] rounded-2xl h-[206px]  shadow-md border-t-2 items-center justify-center '  >
  <div className="h-[96px] w-[96px]"><img src={Add} alt="" onClick={set} /></div>
  <div className="text-[16px]">Start with a new curriculum</div>
</div>

{count.map(() => (
  <Template2  subject={"Computer Science & Engineering"} about={content}/>
          ))}           


</div>
)    
}

export default Template1; 
import React from "react";

function Template2(props){
    return(
        <div className="p-6 gap-4  flex flex-col w-[513px] rounded-2xl h-[206px]  shadow-md border-t-2 flex-start justify-center">
           <div className="flex flex-col gap-4 ">
            <div className="text-[28px] text-[#04314D] font-medium ">{props.subject}</div>
            <div className="text-[16px]">{props.about}</div>
            <div className='flex flex-row gap-4 '>
               <div className='px-4 py-1.5 rounded-2xl bg-[#FFF9C5] text-[#7C3D0B] text-base font-medium justify-center items-center w-fit'>Undergraduate</div>
               <div className='px-4 py-1.5 rounded-2xl bg-[#F2E3FF] text-[#521486] text-base font-medium justify-center items-center w-fit'>Engineering & Technology</div>
           </div>
         </div>
        </div>
    )
}
export default Template2
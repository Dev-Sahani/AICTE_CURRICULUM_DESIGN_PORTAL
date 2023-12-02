import React from 'react'
function Explore1(Props){
    return (
     <div className=' flex flex-col shadow-md gap-6 p-6 border-2 border-slate-200 rounded-2xl w-[517px] h-fit shrink-0'>
       <div className=' flex flex-col gap-2'>
          <div className='text-[#04314D] text-2xl font-medium flex-start'>{Props.branch}</div>
          <div className='flex flex-row gap-4'>
            <div className='w-8 h-8 p-1 items-center justify-center flex-shrink-0 bg-[#F6F6F6] rounded-[1000px]'><img src={Props.images} alt=""/></div>
            <div className='font-medium text-xl text-[#04314D] content-center justify-center'>{Props.college}</div>
          </div>
       </div>
       <div className='flex flex-col gap-2 '>
           <div className='px-4 py-1.5 rounded-2xl bg-[#FFF9C5] text-[#7C3D0B] text-base font-medium justify-center items-center w-fit'>Undergraduate</div>
           <div className='px-4 py-1.5 rounded-2xl bg-[#F2E3FF] text-[#521486] text-base font-medium justify-center items-center w-fit'>Engineering & Technology</div>
       </div>
     </div>

    );
}
export default Explore1

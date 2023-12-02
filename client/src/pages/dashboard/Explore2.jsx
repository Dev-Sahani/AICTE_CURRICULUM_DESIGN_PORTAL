import React from 'react'
import Explore3 from './Explore3'
function Explore2(props){
    return(<div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-1'>
                    <div className='text-[32px] font-semibold text-[#008AD4] font-sans'>Trending</div>
                    <div className="flex justify-center items-center"><img src={props.images} w-10 h-10 alt=""/></div>
                </div> 
                 <div className='flex flex-row flex-wrap shrink-0 p-4 gap-2 flex-start rounded-lg bg-gradient-to-r from-[#006EAB] to-[#2CC4FF] w-[1049px]'>
                  <Explore3  />
                  <Explore3  />
                  <Explore3  />
                  <Explore3  />
                  <Explore3  />
                  <Explore3  />
                </div> 
         </div>)
}
export default Explore2
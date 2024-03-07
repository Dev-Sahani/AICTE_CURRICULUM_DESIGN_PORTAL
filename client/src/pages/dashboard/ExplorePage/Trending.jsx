import React from 'react'
import Plus from "../../../assets/Plus.png"
import Fire from "../../../assets/Fire.png"
import { Link } from 'react-router-dom';

function Trending()
{
    return(
        <div>
        <div className='flex flex-row gap-1'>
          <div className='text-[25px] font-semibold text-[#008AD4] font-sans'>Trending</div>
          <div className="flex justify-center items-center"><img src={Fire} className="w-8 h-8" alt="fire image"/></div>
        </div> 
        
        <div className=' w-full grid grid-cols-3 mb-4  p-3 gap-2 flex-start rounded-lg bg-gradient-to-r from-[#006EAB] to-[#2CC4FF] '>
          {
            Array.map((x)=>{
                return(
                    <Link to="error">
                       <div className=' flex flex-row px-3  bg-white rounded-lg items-center justify-between'>
                         <div className='text-[#064D74] text-xl font-medium h-full'>#{x}</div>
                         <div ><img src={Plus} alt="plus" className="h-[28px] w-[28px] shrink-0" /></div>
                       </div>

                    </Link>
                )
            })
          }
         </div>
         </div>
    )
}
const Array=["Artificial Intelligence","Machine Learning","Data Structure","Algorithm","Java","The Tempest"];
export default Trending
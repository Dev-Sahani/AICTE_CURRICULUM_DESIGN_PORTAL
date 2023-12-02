import React from 'react'
import Download from "../../assets/Download.png"
import Completed from "../../assets/Completed.png"
import Progress from "../../assets/Progress.png"
import Draft2 from "./Draft2"

function Draft1(props){

    var images=<Draft2 image={Completed} type={"Completed"} color={"text-[#BCF526]"}/>
    if(props.Complet){
      images=<Draft2 image={Progress} type={"Progress"} color={"text-[#FFD51B]"}/>
    }
    

    return(
         
     <div className="border-2 border-slate-200 rounded-[16px] px-8 py-8 flex-auto w-[1050px]">
        
        <div className='flex flex-col  items-start space-y-4'>
            <div className='w-full flex flex-row justify-between'>
                <div className=' font-medium text-[#04314D] text-[28px]'>{props.subject}</div>
                <div className='flex bg-[#EFF9FF] rounded-2xl justify-center items-center content-center'>
                    <div className='font-medium text-base  px-4 py-1.5  text-[#04314D]'>
                    {props.date}
                    </div>
                </div>
            </div>
           <div className='font-[16px]'>{props.message}</div>
           <div className='flex flex-row justify-between w-full '>
                <div className='flex justify-center items-center'>{images}</div>

                 <div className='flex flex-row space-x-[8px] justify-center items-center'>
                     <div ><img src={Download} alt="" className='w-[48px]  h-[48px]  '/></div>
                        <div className='flex justify-center items-center'><div>Download</div></div>
                </div>
           </div>



        </div>
       
     </div>

    );
}
export default Draft1;
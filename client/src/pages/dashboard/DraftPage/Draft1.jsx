import { Link } from 'react-router-dom';
import Download from "../../../assets/Download.png"
import Completed from "../../../assets/Completed.png"
import Progress from "../../../assets/Progress.png"
import Draft2 from "./Draft2"
import Array from "./utility"

function Draft1(){
    return(
        <div className="flex flex-col gap-3">
         <div className="font-bold text-[40px] text-[#064D74]">Drafts</div>
       
          {
         Array.map((x)=>{

        //   CREATING PROGRESS AND COMPLETED BAR
           var images=<Draft2 image={Completed} type={"Completed"} color={"text-[#BCF526]"}/>
           if(x.status==="progress"){
             images=<Draft2 image={Progress} type={"Progress"} color={"text-[#FFD51B]"}/>
           }
         // PROGRESS AND COMPLETED BAR END

            return (
         <div className="border-2 bg-white border-slate-200 rounded-[16px] px-4 py-5 flex-auto w-full hover:drop-shadow-md hover:border-3 hover:border-slate-500">
        
         <div className='flex flex-col  items-start space-y-4'>
            <div className='w-full flex flex-row justify-between'>
                <div className=' font-medium text-[#04314D] text-[28px]'>{x.subject}</div>
                <div className='flex bg-[#EFF9FF] rounded-2xl justify-center items-center content-center h-fit'>
                    <div className='font-medium text-base  px-4 py-1.5  text-[#04314D]'>
                    {x.Date}
                    </div>
                </div>
            </div>
           <div className='font-[16px]'>{x.message}</div>
           <div className='flex flex-row justify-between w-full '>
                <div className='flex justify-center items-center'>{images}</div>

                  {/* CREATING DOWNLOAD BUTTON */}
                 <Link to="" key={x.courseId} className='flex flex-row space-x-[8px] justify-center items-center'>
                     <div ><img src={Download} alt="" className='w-[48px]  h-[48px]  '/></div>
                     <div className='flex justify-center items-center'><div>Download</div></div>
                </Link>
                {/* DOWNLOAD BUTTON END */}
           </div>
         </div>
         </div> 
          )  })
    
              } </div> );
}
export default Draft1;
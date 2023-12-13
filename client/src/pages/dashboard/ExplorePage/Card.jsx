import Array from "./ResourceUtility"
import { Link } from 'react-router-dom';

function Explore1(){
    return (
      <>
    <div className=" w-full grid grid-cols-2 my-4 gap-6 min-w-fit ">
      {
         Array.map((x,index)=>{ 
          return(
         <Link to={x.url} key={index} >   
          <div className=' flex flex-col shadow-md hover:border-4 hover:border-slate-400 gap-5 p-5 border-2 bg-white rounded-2xl  min-h-fit min-w-fit '>
            
            <div className=' flex flex-col gap-2'>
               <div className='text-[#04314D] text-2xl font-medium flex-start'>{x.subjectname}</div>
               <div className='flex flex-row gap-4'>
                  <div className='w-8 h-8 p-1 items-center justify-center flex-shrink-0 bg-[#F6F6F6] rounded-[1000px]'><img src={"error mono"} alt=""/></div>
                  <div className='font-medium text-xl text-[#04314D] content-center justify-center'>{x.instituteName}</div>
               </div>
            </div>

            <div className='flex flex-col gap-2 '>
              <div className='px-3 py-1 rounded-2xl bg-[#FFF9C5] text-[#7C3D0B] text-base font-medium justify-center items-center w-fit'>{x.level}</div>
              <div className='px-3 py-1 rounded-2xl bg-[#F2E3FF] text-[#521486] text-base font-medium justify-center items-center w-fit'>{x.program}</div>
            </div>

          </div>
          </Link>     )
       } )
       }
    </div>
   </> );
}
export default Explore1

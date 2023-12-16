import Array from "./utility"
import { Link } from 'react-router-dom';
function Resources1(props){
 return(

    Array.map((x)=>{
     return(
   <Link
    to={x.url} 
    key={x.subjectId}
    >
      <div className='mx-2 my-2 flex flex-col space-y-4 w-full min-w-fit '>
          <div className='rounded-2xl flex flex-row p-6 space-x-4 hover:border-4 border-2 bg-white hover:border-slate-300 shadow-sm'>
             <div><img src={x.BookImage}  alt="" className='flex shrink-0 h-full w-[90px] '/></div>

            <div className='flex flex-col space-y-4 justify-between  w-full'>
                 <div className='flex flex-col space-y-1'>
                    <div className='flex flex-row justify-between'>
                         <div className='text-[28px] leading-none'>{x.subjectName}</div>
                         <div className='flex flex-row space-x-2 '>
                           <div className='rounded-2xl bg-[#F3FFC7] px-4 py-1.5 font-medium text-[#5B8506] items-center justify-center content-center'>{x.type}</div>
                           <div className='rounded-2xl bg-[#FEDEEA] px-4 py-1.5 font-medium text-[#F8186E] items-center justify-center'>{x.title}</div>                          
                         </div>
                    </div>
                    <div className='font-normal text-xl'>{x.author}</div>
                 </div>
                 <div className='font-normal text-[16px]'>{x.about}</div>
            </div>
          </div>
       </div>
     </Link>  
          ) 
 } )
 );
}

export default Resources1;
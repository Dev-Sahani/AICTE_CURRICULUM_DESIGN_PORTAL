// import Array from "./utility"
import { Link } from 'react-router-dom';
import { useFilterContext } from "../../../context/FilterContext";
import { useState, useEffect } from "react";

function Resources1(props){

  const { getAllResources, resourceSearch, resourceFormat, resouceProgram } = useFilterContext();
  const [Array, setArray] = useState([]);

  useEffect(()=>{
    const data = async ()=>{
      const res = await getAllResources();
      return res;
    }
    data().then((res)=>{
      console.log(res);
      if(res) setArray(res.data);
    });
  // eslint-disable-next-line
  }, [resourceSearch, resourceFormat, resouceProgram]);

  return(

    Array.map((x, index)=>{
      const truncatedDescription = (x.description.length > 25)
      ? (`${x.description.substr(0, 25)}...`)
      : (x.description);
     return(
   <Link
    to={x.url} 
    key={index}
    >
      <div className='mx-1 my-2 flex flex-col  w-full min-w-fit '>
          <div className='rounded-2xl flex flex-row p-5 pb-3 space-x-3 gap-5 h-full bg-white shadow-sm transform transition-transform duration-300 hover:scale-[1.03] '>
             <div><img src={x.BookImage}  alt="" className='flex shrink-0 h-full w-[90px] '/></div>

            <div className='flex flex-col space-y-4 justify-between  w-full'>
                 <div className='flex flex-col space-y-1'>
                    <div className='flex flex-row justify-between'>
                         {/* <div className='text-xl font-medium leading-none'>{x.subjectName}</div> */}
                         <div className='flex flex-row space-x-2 '>
                           <div className='rounded-2xl bg-[#F3FFC7] px-4 py-1.5 font-medium text-[#5B8506] items-center justify-center content-center'>{x.type}</div>
                           <div className='rounded-2xl bg-[#FEDEEA] px-4 py-1 font-medium text-[#F8186E] items-center justify-center'>{x.title}</div>                          
                         </div>
                    </div>
                    <div className=' text-medium'>{x.author}</div>
                 </div>
                 <div className='text-sm'>
                   {truncatedDescription}
                 </div>
            </div>
          </div>
    </div>
     </Link>  
          ) 
 } )
 );
}

export default Resources1;

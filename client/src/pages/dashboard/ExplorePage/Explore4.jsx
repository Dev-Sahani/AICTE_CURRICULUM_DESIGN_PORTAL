import React from 'react'
import Search from "../../../assets/Search.png"

function Explore4(){




    return(
    <div className='flex flex-row gap-4  justify-between'>

       <div className='gap-2 px-2 flex flex-row border border-[#989898] rounded-[6px] w-[440px] shrink-0 shadow-md flex-start items-center bg-white'>
        <div><img src={Search} alt="" className="w-[48px] h-[48px]"/></div>
        <div className='text-[#989898] text-[16px]'>
               <form className=' w-[368px]  h-[47px]'>
                  <input  className='w-full h-full focus:outline-none' type="text" id="lname" name="lname" placeholder='Search Topics, Curriculums etc.. '/>
               </form>
        </div>
       </div> 

       <div>
             <form action="/action_page.php">
                     <select  className='border border-[#989898] rounded-[6px] w-full pl-2 pr-4 h-[48px]  text-[16px]' >
                            <option value="selecct level">Select Level</option>
                            <option value="machine learning">Machine Learning</option>
                            <option value="data mining">Data Mining</option>
                            <option value="xyz">xyz</option>
                     </select>
            </form>
     </div>  
       <div>
             <form action="/action_page.php">
                     <select  className='border border-[#989898] rounded-[6px] w-[344px] pl-2 pr-4 h-[48px]  text-[16px]' >
                            <option value="selecct program">Select Program</option>
                            <option value="machine learning">Machine Learning</option>
                            <option value="data mining">Data Mining</option>
                            <option value="xyz">xyz</option>
                     </select>
            </form>
     </div>  








    </div>
    )
}
export default Explore4
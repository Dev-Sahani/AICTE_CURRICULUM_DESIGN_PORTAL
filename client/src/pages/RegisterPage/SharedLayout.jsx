import React from 'react'

export default function SharedLayout({children}) {
  return (
    <div className="flex flex-col bg-gradient-to-r from-primary-700 to-primary-400 w-full h-[100vh]">
    <div className="flex flex-row text-xl text-white align-bottom gap-3 items-center p-4 pl-6 ">
       {/* <img src={Logo} alt="" className="w-[80px] h-[80px]" /> */}
       <h1 className='text-3xl font-semibold'>AICTE curriculum design portal</h1>
    </div> 

    <div className="flex justify-around">
     
    <div className="bg-blue-300 flex flex-col  justify-center items-center align-middle text-xl font-medium text-white rounded-md p-3">
        {/* <img className="w-[60px] h-[60px]" src={AdminImage} alt=""/> */}
        <h1>Administrator</h1>
    </div>

    <div className=" flex flex-col  justify-center items-center align-middle text-xl font-medium text-white rounded-md p-3 max-w-[260px]">
        {/* <img className="w-[80px] h-[80px]" src={Curriculum} alt=""/> */}
        <h1>Curriculum Developer</h1>
    </div>

</div>

<div className="flex w-full items-center justify-center ">
 {children}
</div>




</div>

  )
}

import React from 'react'
import { NavButton } from '../../components'

export default function SharedLayout({children,registerAdmin, registerDev}) {
  return (
    <div className="flex flex-col bg-gradient-to-r from-primary-700 to-primary-400 w-full h-[100vh]">
    <div className="flex flex-row text-xl text-white align-bottom gap-3 items-center p-4 pl-6 ">
       <h1 className='text-3xl font-semibold'>AICTE curriculum design portal</h1>
    </div> 

    <div className="flex justify-around">
     
    <div className="bg-blue-300 flex flex-col  justify-center items-center align-middle text-xl font-medium text-white rounded-md p-3">
        <h1 onClick={registerAdmin}>Administrator</h1>
    </div>

    <div className=" flex flex-col  justify-center items-center align-middle text-xl font-medium text-white rounded-md p-3 max-w-[260px]">
        <h1 onClick={registerDev}>Curriculum Developer</h1>
    </div>

</div>

<div className="flex w-full items-center justify-center ">
 {children}
</div>




</div>

  )
}

import React from 'react'

function Resources1(props){
    return(
        <div className='rounded-2xl flex flex-row p-6 space-x-4 border-2 border-slate-300 '>
            <div><img src={props.images}  alt="" className='flex shrink-0 h-full w-[90px] '/></div>

            <div className='flex flex-col space-y-4 justify-between  w-full'>
                <div className='flex flex-col space-y-1'>
                    <div className='flex flex-row justify-between'>
                        <div className='text-[28px] leading-none'>{props.subject}</div>
                        <div className='flex flex-row space-x-2 '>
                           <div className='rounded-2xl bg-[#F3FFC7] px-4 py-1.5 font-medium text-[#5B8506] items-center justify-center'>Book</div>
                           <div className='rounded-2xl bg-[#FEDEEA] px-4 py-1.5 font-medium text-[#F8186E] items-center justify-center'>{props.name}</div>                          
                        </div>
                        
                    </div>
                    <div className='font-normal text-xl'>{props.author}</div>
                </div>
                <div className='font-normal text-[16px]'>{props.about}</div>
            </div>
        </div>
    )
}

export default Resources1;
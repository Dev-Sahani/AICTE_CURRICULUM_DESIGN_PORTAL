import React from 'react'

function Draft2(props){
    
return(
    <div className='flex flex-row space-x-[8px] justify-center items-center'>
    
            <div ><img src={props.image} alt="" className='w-[25px]  h-[25px] '/></div>

            <div className={'flex justify-center font-medium text-[20px] items-center '+ props.color}>
              <div>{props.type}</div>
            </div>

    </div> 
);
}
export default Draft2
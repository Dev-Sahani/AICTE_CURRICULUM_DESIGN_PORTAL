import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext';

export default function AdminCurriculum() {
  const { verifyAdminOTP , sendAdminOTP }  = useUserContext();
  const t = useUserContext();
  const [localState, setLocalState] = useState({
    email:"",
    otp:"",
  });

  const [otpSend, setOtpSend] = useState(false);
  const handleChange = (e)=>{
    setLocalState({
      ...localState,
      [e.target.name] : e.target.value,
    })
  }
  
  const onSubmit = async (e)=>{
    // e.preventDefault();
    if(!otpSend) {
      const res = await sendAdminOTP({email: localState.email});
      if(!res) return;
      setOtpSend(true);
    } 
    else {
      const res = await verifyAdminOTP({...localState});
      if(!res) return;
      // const t = useUserContext();
      console.log(t);
    }
  }

  return (
    <div className='w-96 h-[60vh] rounded-3xl bg-white flex flex-col justify-start items-center relative'>
      <h1 className='m-4 text-2xl'>Welcome!</h1>
      <div className='flex flex-col m-4'>
        <div className='flex flex-col justify-start'>
          <label className='ml-1'>AICTE Email ID</label>
          <input 
            className='p-4 py-2 ml-0 mt-0 m-2 border-2 border-gray-300 rounded-lg'
            placeholder='Enter AICTE email'
            name="email" 
            value={localState.email} 
            onChange={handleChange}
          />
        </div>
        { otpSend && 
          <div className='flex flex-col justify-start my-3'>
            <label className='ml-1'>OTP</label>
            <input 
              className='p-4 py-2 ml-0 mt-0 m-2 border-2 border-gray-300 rounded-lg'
              placeholder='Enter AICTE email'
              name="otp" 
              value={localState.otp} 
              onChange={handleChange}
            />
          </div>
        }
        <button className='bg-secondary-400 p-4 py-2 rounded-lg' onClick={onSubmit}>
           {otpSend ? "Verify" : "Generate OTP"}
        </button>
      </div>
      <footer className='absolute bottom-4'>
        Already Register? 
        <span className="text-primary-500" Click={()=>null}>Click Here</span>
      </footer>
    </div>
  )
}

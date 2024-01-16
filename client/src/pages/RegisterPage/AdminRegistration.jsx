import { useState } from "react";
import { useUserContext } from "../../context";

export default function AdminRegistration() {
    const { verifyAdminOTPAndRegister , sendAdminOTP }  = useUserContext();
  
    const [localState, setLocalState] = useState({
      name:"",
      password:"",
      email:"",
      otp:"",
    });
    const [otpSend, setOtpSend] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    
    const handleChange = (e)=>{
      setLocalState({
        ...localState,
        [e.target.name] : e.target.value,
      })
    }
    
    const onSubmit = async (e)=>{
      // e.preventDefault();
      setButtonDisable(true);
      if(!otpSend) {
        const res = await sendAdminOTP({email: localState.email});
        if(!res){
          setButtonDisable(false)
          return
        }
        setOtpSend(true);
      }
      else {
        const res = await verifyAdminOTPAndRegister({...localState});
        //if not otp not verified handled in userContext
        if(!res){
          return
        }
      }
      setButtonDisable(false);
    }
  
    return (
        <div className='flex flex-col m-4 text-sm'>
          <div className='flex justify-between my-1'>
            <label className='mr-2 self-center'>Name</label>
            <input 
              className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
              placeholder='Enter Name'
              name="name" 
              type="text"
              value={localState.name} 
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between my-1'>
            <label className='mr-2 self-center'>password</label>
            <input 
              className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
              placeholder='Enter password'
              name="password" 
              type="password"
              value={localState.password} 
              onChange={handleChange}
            />
          </div>
        {!otpSend && <div className='flex justify-between my-1'>
            <label className='mr-2 self-center'>AICTE email</label>
            <input 
              className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
              placeholder='Enter AICTE email'
              name="email" 
              type="email"
              value={localState.email} 
              onChange={handleChange}
            />
          </div>}
          { otpSend && 
            <div className='flex justify-between my-1'>
              <label className='mr-2 self-center'>OTP</label>
              <input 
                className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
                placeholder='Enter AICTE email'
                name="otp" 
                value={localState.otp} 
                onChange={handleChange}
              />
            </div>
          }
          <button disabled={buttonDisable} className={`bg-secondary-400 m-2 p-4 py-2 rounded-lg ${buttonDisable&&"bg-opacity-50"}`} onClick={onSubmit}>
              {otpSend ? "Register" : "Generate OTP"}
          </button>
        </div>
    )
  }
  
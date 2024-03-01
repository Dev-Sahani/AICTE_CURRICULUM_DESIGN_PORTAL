import { useState } from "react";
import { useUserContext } from "../../context";

export default function Registration() {
    const { verifyAdminOTPAndRegister , sendAdminOTP, loading }  = useUserContext();
  
    const [localState, setLocalState] = useState({
      name:"",
      password:"",
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
      e.preventDefault();
      if(loading)return;
      if(!otpSend) {
        await sendAdminOTP({email: localState.email});
        setOtpSend(true);
      }
      else {
        await verifyAdminOTPAndRegister({...localState});
      }
    }
  
    return (
        <form className='flex flex-col m-4 text-sm'>
          {!otpSend &&<>
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
          <div className='flex justify-between my-1'>
            <label className='mr-2 self-center'>AICTE email</label>
            <input 
              className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
              placeholder='Enter AICTE email'
              name="email" 
              type="email"
              value={localState.email} 
              onChange={handleChange}
            />
          </div>
          </>}
          { otpSend && 
            <div className='m-1'>
              <label className='my-2 self-center block'>Enter the otp send to your mail</label>
              <input 
                className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
                placeholder='Enter AICTE email'
                name="otp" 
                value={localState.otp} 
                onChange={handleChange}
              />
            </div>
          }
          <button type="submit" disabled={loading} className={`bg-secondary-400 my-2 p-4 py-2 rounded-lg ${loading&&"bg-opacity-50"}`} onClick={onSubmit}>
              {otpSend ? "Register" : "Generate OTP"}
          </button>
        </form>
    )
  }
  
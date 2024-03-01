import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loading }  = useUserContext();
  const navigate = useNavigate()

  const [localState, setLocalState] = useState({
    password:"",
    email:"",
  });
  
  const handleChange = (e)=>{
    setLocalState({
      ...localState,
      [e.target.name] : e.target.value,
    })
  }
  
  const onSubmit = async (e)=>{
    e.preventDefault();
    await login(localState)
    //if login failed - handled in userContext
    navigate('/')
  }

  return (
      <form className='flex flex-col m-4 text-sm'>
        <div className='flex justify-between my-1'>
          <label className='mr-2 self-center'>Email</label>
          <input 
            className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
            placeholder='Enter AICTE email'
            name="email" 
            type="email"
            value={localState.email} 
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
        <button type="submit" disabled={loading} className={`bg-secondary-400 my-4 p-4 py-2 rounded-lg ${loading &&"bg-opacity-50"}`} onClick={onSubmit}>
            Login
        </button>
      </form>
  )
}

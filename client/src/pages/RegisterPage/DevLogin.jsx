import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AdminCurriculum() {
  const { loginDeveloper }  = useUserContext();
  const navigate = useNavigate()

  const [localState, setLocalState] = useState({
    userId:"",
    password:"",
  });
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
    const res = await loginDeveloper(localState)
    //if not not verified handled in userContext
    if(!res){
        return
    }
    navigate('/')
    setButtonDisable(false);
  }

  return (
      <div className='flex flex-col m-4 text-sm'>
        <div className='flex justify-between my-1'>
          <label className='mr-2 self-center'>user id</label>
          <input 
            className='p-4 py-2 border-2 border-gray-300 rounded-lg self-center'
            placeholder='Enter user id'
            name="userId" 
            type="text"
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
        <button disabled={buttonDisable} className={`bg-secondary-400 my-2 p-4 py-2 rounded-lg ${buttonDisable&&"bg-opacity-50"}`} onClick={onSubmit}>
            Login
        </button>
      </div>
  )
}

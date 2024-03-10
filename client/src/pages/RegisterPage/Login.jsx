import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login({setIsLogin}) {
  const { login, loading } = useUserContext();
  const navigate = useNavigate()

  const [localState, setLocalState] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!localState.email || !localState.password) {
      alert("Please enter all details!");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(localState.email)) {
      alert("Email is not in correct format!");
      return;
    }

    await login(localState)
    //if login failed - handled in userContext
    navigate('/')
  }

  return (
    <div className='rounded-2xl bg-white items-center flex flex-col p-4'>
      <h1 className='text-lg'>Login</h1>
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
        <button type="submit" disabled={loading} className={`bg-secondary-400 my-4 p-4 py-2 rounded-lg ${loading && "bg-opacity-50"}`} onClick={onSubmit}>
          {
            loading
              ?
              "Loading..."
              :
              "Login"
          }
        </button>
      </form>
      <p>
        Don't have a account? 
        <span className="text-blue-400 hover:cursor-pointer" onClick={() => { setIsLogin(false) }}>click here</span>
      </p>
    </div>
  )
}

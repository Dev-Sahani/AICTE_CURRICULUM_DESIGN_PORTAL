import { NavBar } from "../../components";
import { useState } from 'react'
import Registration from './Registration'
import Login from './Login'
import { useUserContext } from "../../context";
import { Navigate } from "react-router-dom";

export default function RegisterPage(){
    const [isLogin, setisLogin] = useState(true)
    const {user} = useUserContext()

    return (
    <>
    {user && <Navigate to="/" />}
    <div className="bg-gradient-to-r from-primary-700 to-primary-400 flex flex-col min-h-screen">
      <NavBar/>
      <div className="flex justify-center items-center flex-grow">
        <div className='rounded-2xl bg-white items-center flex flex-col p-4'>
          <h1 className='text-lg'>{isLogin?"Login":"Register"}</h1>
          {
            isLogin?
            <Login />
            :
            <Registration />
          }
          <p>
            {isLogin?
              <>Don't have a account? <span className="text-blue-400 hover:cursor-pointer" onClick={()=>{setisLogin(false)}}>click here</span></>
              :<>Already Registered? <span className="text-blue-400 hover:cursor-pointer" onClick={()=>setisLogin(true)}>click here</span></>
            }
          </p>   
        </div>
      </div>
    </div>
    </>)
}


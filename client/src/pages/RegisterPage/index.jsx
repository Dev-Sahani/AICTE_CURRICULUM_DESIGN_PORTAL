import { NavBar } from "../../components";
import { useState } from 'react'
import AdminRegistration from './AdminRegistration'
import AdminLogin from './AdminLogin'
import DevLogin from './DevLogin'
import { useUserContext } from "../../context";
import { Navigate } from "react-router-dom";

export default function RegisterPage(){
    const [isAdmin, setIsAdmin] = useState(true)
    const [isLogin, setisLogin] = useState(true)
    const {user} = useUserContext()

    return (
    <>
    {user && <Navigate to="/" />}
    <div className="bg-gradient-to-r from-primary-700 to-primary-400 flex flex-col min-h-screen">
      <NavBar/>
      <div className='flex justify-evenly p-3'>
        <button className={`text-lg text-white font-semibold rounded-md p-3 ${isAdmin&&"bg-primary-400"} hover:cursor-pointer`}
            onClick={()=>setIsAdmin(true)}>
            Administrator
        </button>
        <button disabled={!isLogin} className={`text-lg text-white font-semibold rounded-md p-3 ${!isAdmin&&"bg-primary-700"} ${isLogin?"hover:cursor-pointer":"hover:cursor-not-allowed"}`}
            onClick={()=>setIsAdmin(false)}>
            Curriculum Developer
        </button>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className='rounded-2xl bg-white items-center flex flex-col p-4'>
          <h1 className='text-lg'>{isLogin?"Login":"Register"}</h1>
          {isLogin && (isAdmin?<AdminLogin />:<DevLogin />)}
          {!isLogin && <AdminRegistration />}
          <p>
            {isLogin?
              <>Don't have a account? <span className="text-blue-400 hover:cursor-pointer" onClick={()=>{setIsAdmin(true);setisLogin(false)}}>click here</span></>
              :<>Already Registered? <span className="text-blue-400 hover:cursor-pointer" onClick={()=>setisLogin(true)}>click here</span></>
            }
          </p>   
        </div>
      </div>
    </div>
    </>)
}


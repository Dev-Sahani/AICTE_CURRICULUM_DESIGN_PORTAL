import { NavBar } from "../../components";
import { useState } from 'react'
import Registration from './Registration'
import Login from './Login'
import { useUserContext } from "../../context";
import { Navigate } from "react-router-dom";

export default function RegisterPage(){
    const [isLogin, setisLogin] = useState(true)
    const [isAdmin, setisAdmin] = useState(true)
    const {user} = useUserContext()

    return (
    <>
    {user && <Navigate to="/" />}
    <div className="bg-gradient-to-r from-primary-700 to-primary-400 flex flex-col min-h-screen">
      <NavBar/>
      {
        !isLogin && 
        <div className="w-full flex justify-evenly items-center mt-8">
          <button 
            className="w-48 border-2 rounded-xl p-4 text-lg font-semibold bg-primary-400 hover:scale-105 transition-hover transition-transform ease-in"
            onClick={()=>setisAdmin(true)}
          >
            Admin
          </button>
          <button 
            className="w-48 border-2 rounded-xl p-4 text-white text-lg font-semibold bg-primary-600 hover:scale-105 transition-hover transition-transform ease-in"
            onClick={()=>setisAdmin(false)}
          >
            Faculty or Expert
          </button>
        </div>
      }
      <div className="flex justify-center items-center flex-grow">
      {
        isLogin?
        <Login setIsLogin={setisLogin}/>
        :
        <Registration isAdmin={isAdmin} setIsLogin={setisLogin}/>
      }
      </div>
    </div>
    </>)
}


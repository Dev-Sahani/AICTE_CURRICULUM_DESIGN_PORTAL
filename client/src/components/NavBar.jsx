import React from 'react'
import logo from "../assets/logo.png";

const NavBar = ({className}) => {
  return (
      <main 
        className={
            className + 
            " flex justify-start bg-gradient-to-r from-primary-700 to-primary-400"
        }
      >
          <img className="h-12" src={logo} alt="AICTE_LOGO" />
          <div className='h-12 flex items-center'>
              <h1 className="text-2xl text-white"> AICTE Curriculum Design Portal </h1>
          </div>
      </main>
  )
}

export default NavBar
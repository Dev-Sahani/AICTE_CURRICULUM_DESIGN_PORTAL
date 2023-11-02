import React from 'react'
import logo from "../assets/logo.png";

const NavBar = ({className}) => {
  return (
      <main className={className + " flex justify-start "}>
          <img className="h-12" src={logo} alt="AICTE_LOGO" />
          <div className='h-12 flex items-center'>
              <h1 className="text-2xl"> AICTE Curriculum Design Portal </h1>
          </div>
      </main>
  )
}

export default NavBar
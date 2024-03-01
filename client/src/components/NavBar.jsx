import React from 'react'
import ImageComponent from '../assets';

const NavBar = ({className}) => {
  return (
      <main 
        className={
            className + 
            " flex justify-start bg-gradient-to-r from-primary-700 to-primary-400 "
        }
      >
          <ImageComponent imageName="LogoImage" className="h-12" alt="AICTE_LOGO" />
          <div className='h-12 flex items-center'>
              <h1 className="text-2xl text-white"> AICTE Curriculum Design Portal </h1>
          </div>
      </main>
  )
}

export default NavBar
import React from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
      <div>SideBar</div>
      <Outlet />
    </div>
  )
}

export default SideBar
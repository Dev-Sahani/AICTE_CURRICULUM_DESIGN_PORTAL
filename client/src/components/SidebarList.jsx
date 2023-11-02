import React from 'react'
import { Link } from 'react-router-dom';

const SidebarList = ({data}) => {
  return (
    <Link className='h-12 ml-4 flex gap-4 items-center' to={data.link}>
        <img className="h-6 w-6" src={data.icon} alt={data.name}/>
        <h2>{data.name}</h2>
    </Link>
  )
}

export default SidebarList
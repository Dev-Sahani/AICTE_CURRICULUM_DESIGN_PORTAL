import React from 'react'
import { Link } from 'react-router-dom';

const SidebarList = ({data}) => {
  return (
    <Link 
      className={'h-12 ml-4 flex gap-4 items-center' + data.className} 
      to={data.link}
      {...data}
    >
        <img className="h-6 w-6" src={data.icon} alt={data.name}/>
        <h2 style={{textWrap: "nowrap"}} >{data.name}</h2>
    </Link>
  )
}

export default SidebarList
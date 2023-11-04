import React from 'react';
import { Outlet } from 'react-router-dom';
import {NavBar, Sidebar} from '../../components';

const SharedLayout = () => {

  return (
    <main>
      <NavBar className="gap-x-4 px-6 py-4 h-[13vh]" />
      <div className='flex'>
        <Sidebar className={`basis-60 h-[86vh]`} />
        <Outlet className="h-[86vh]" />
      </div>
    </main>
  )
}

export default SharedLayout
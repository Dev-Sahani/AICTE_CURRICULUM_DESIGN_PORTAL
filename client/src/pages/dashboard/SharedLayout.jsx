import React from 'react';
import { Outlet } from 'react-router-dom';
import {NavBar, Sidebar} from '../../components';

const SharedLayout = () => {

  return (
    <main>
      <NavBar className="gap-x-4 mx-6 my-2 mt-4 h-[10vh]" />
      <div className='flex'>
        <Sidebar className={`basis-60 h-[86vh]`} />
        <Outlet className="h-[86vh]" />
      </div>
    </main>
  )
}

export default SharedLayout
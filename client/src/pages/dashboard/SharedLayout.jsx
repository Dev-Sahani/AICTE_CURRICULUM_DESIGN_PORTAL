import React from 'react';
import { Outlet } from 'react-router-dom';
import {NavBar, Sidebar} from '../../components';

const SharedLayout = () => {

  return (
    <>
      <NavBar className="gap-x-4 px-6 py-4 h-[13vh]" />
      <main className='flex w-[100vw]'>
        <Sidebar className="h-[87vh] border-2" />
        <div className="h-[86vh] w-full px-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default SharedLayout
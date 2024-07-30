import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Sidebar } from "../../components";

const SharedLayout = () => {
  return (
    <>
      <NavBar className="gap-x-4 p-2 md:px-6 md:py-4" />
      <main className="flex h-full w-[100vw] grow">
        <Sidebar className="border-2" />
        <div className="w-full px-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default SharedLayout;

import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;

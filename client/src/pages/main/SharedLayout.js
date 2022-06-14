import React from "react";
import { Outlet } from "react-router-dom";
import {  BottomBar, Navbar, } from "../../components";


const SharedLayout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default SharedLayout;

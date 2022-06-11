import React from "react";
import { Outlet } from "react-router-dom";
import { BottomBar, Navbar } from "../../components";

const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;

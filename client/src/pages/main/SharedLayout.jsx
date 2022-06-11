import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar user={user} />
      <Outlet />
    </div>
  );
};

export default SharedLayout;

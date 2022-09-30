import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
const withNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default withNav;

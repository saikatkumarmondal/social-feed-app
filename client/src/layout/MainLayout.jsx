import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB]"> {/* Softened background color */}
      <Navbar />
      <div className="pt-5"> 
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 mt-16 flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

import React from "react";
import { Outlet } from "react-router-dom";
import { TeamsSidebar } from "../components/ui/TeamsSidebar";

export const TeamsLayout = () => {
  return (
    <div className="flex w-full h-full">
      <TeamsSidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TimeSheet } from "./timesheet";
import { Approval } from "./approval";
import { Home } from "./home";
import { Profile } from "./profile";
import { SideNavAdmin } from "../widgets/sidenavAdmin";
import { CreateTimeSheet } from "./createTimeSheet";
import { PendingApproval } from "./pendingApproval";

export const Admin = ({ setUser, email }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin setUser={setUser} email={email} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="timesheet" element={<TimeSheet />} />
          <Route path="create" element={<CreateTimeSheet />} />
          <Route path="approval" element={<Approval />} />
          <Route path="pendingApproval" element={<PendingApproval />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

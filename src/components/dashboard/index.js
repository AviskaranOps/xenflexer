import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../widgets/footer";
import { Home } from "./home";
import { SideNav } from "../widgets/sidenav";
import { DashboardTimeSheet } from "./dashboardTimeSheet";
import { Profile } from "./profile";
import { Benifit } from "./benifit";
import { Payroll } from "./payroll";

export const DashBoard = ({ setUser, email }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav setUser={setUser} email={email} />
        <Routes>
          <Route path="/" element={<Navigate to="benifit" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<DashboardTimeSheet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="benifit" element={<Benifit />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

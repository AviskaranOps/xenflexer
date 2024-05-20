import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../widgets/footer";
import { Home } from "./home";
import { SideNav } from "../widgets/sidenav";
import { DashboardTimeSheet } from "./dashboardTimeSheet";
import { Profile } from "./profile";
import { Benefit } from "./benefit";
import { Payroll } from "./payroll";
import { Documents } from "./documents";
import { New_Profile } from "./new_profile";

export const DashBoard = ({ setUser, email }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav setUser={setUser} email={email} />
        <Routes>
          <Route path="/" element={<Navigate to="benifit" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<DashboardTimeSheet />} />
          <Route path="myprofile" element={<New_Profile />} />
          <Route path="benefit" element={<Benefit />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="documnets" element={<Documents />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import ForgotPass from "./forgot_pass";
import Footer from "../widgets/footer";
import { Home } from "../dashboard/home";
import { DashBoard } from "../dashboard";
import { LandingPage } from "../LandingPage";

export const Auth = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="website" replace />} />
        <Route path="website" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotPass" element={<ForgotPass />} />
        <Route path="userProfile" element={<DashBoard/>}/>
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

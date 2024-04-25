import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import ForgotPass from "./forgot_pass";
import Footer from "../widgets/footer";

export const Auth = ({ setUser, setEmail }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route
          path="login"
          element={<Login setUser={setUser} setMail={setEmail} />}
        />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotPass" element={<ForgotPass />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

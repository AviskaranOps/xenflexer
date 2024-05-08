import React from "react";
import logo from "../../assets/images/lOGO 1.png";

export const Footer = () => {
  return (
    <footer className="w-full md:px-28  mb-8 mt-5 grid grid-flow-col items-center justify-between">
      <img src={logo} alt="logo" />
      <text style={{ color: "#667085" }}>
        © 2024 Xenspire. All rights reserved.
      </text>
    </footer>
  );
};

import React from "react";
import { Main } from "./main";
import { Values } from "./values";
import { Feature } from "./feature";
import { Benefit } from "./benefits";
import { Difference } from "./difference";
import { Footer } from "./footer";

export const LandingPage = () => {
  return (
    <div>
      <Main />
      <Values />
      <Feature />
      <Benefit />
      <Difference />
      <Footer />
    </div>
  );
};

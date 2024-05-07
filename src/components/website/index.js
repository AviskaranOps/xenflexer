import React from "react";
import { Main } from "./main";
import { Values } from "./values";
import { Feature } from "./feature";
import { Benefit } from "./benefits";
import { Difference } from "./difference";
import { Footer } from "./footer";
import { Reviews } from "../website/reviews";

export const Desktop = () => {
  return (
    <div className="min-w-80">
      <Main />
      <Values />
      <Feature />
      <Benefit />
      <Difference />
      <Reviews/>
      <Footer />
    </div>
  );
};

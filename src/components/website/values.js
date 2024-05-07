import React from "react";
import closeloop from "../../assets/images/uil_technology.png";
import challenge from "../../assets/images/streamline_ai-technology-spark.png";
import integrity from "../../assets/images/uil_adjust-half.png";
import community from "../../assets/images/carbon_development.png";
import quality from "../../assets/images/uil_server-network-alt.png";

export const Values = () => {
  return (
    <div className="px-6 py-16 md:p-20">
      <div className="grid grid-flow-row text-center justify-center gap-4">
        <text className="text-app-gray900 font-semibold text-3xl sm:text-4xl">
        Unlock More Value with Freedom and <br /> Transparency
        </text>
        <text className="text-black text-base sm:text-xl mt-2">
        Experience the power of choice and clarity with every opportunity, only at <br />
        XenFlexer. Powered by XenHire's precision matching, we offer an unrivalled blend <br />
        of freedom and security. Dive into the best of both worlds with XenFlexer, where<br /> 
        your contracting career meets unparalleled opportunities and benefits!
        </text>
        <text className="my-12 text-app-gray900 font-semibold text-4xl">
          Our Values
        </text>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
      <div className="grid grid-flow-row justify-center text-center ">
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <div className="flex justify-center">
            <img src={closeloop} alt="closeloop" />
          </div>
          <text className="text-app-gray900 text-xl font-semibold mt-3">
          Closed Loop
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <div className="flex justify-center">
            <img src={challenge} alt="challenge" />
          </div>
          <text className="text-app-gray900 text-xl font-semibold mt-3">
          Challenge the tradition
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <div className="flex justify-center">
            <img src={integrity} alt="integrity" />
          </div>
          <text className="text-app-gray900 text-xl font-semibold mt-3">
          Integrity
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
        </div>
      </div>

      <div className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="grid grid-flow-row justify-center text-center ">
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <div className="flex justify-center">
            <img src={quality} alt="Quality" />
          </div>
          <text className="text-app-gray900 text-xl font-semibold mt-3">
          Quality
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <div className="flex justify-center">
            <img src={community} alt="Community Development" />
          </div>
          <text className="text-app-gray900 text-xl font-semibold mt-3">
            Community Development
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
        </div>
      </div>
    </div>
  );
};

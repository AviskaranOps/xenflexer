import React from "react";

export const Feature = () => {
  return (
    <div className="p-9 bg-app-moss">
      <div className="grid grid-flow-row text-center justify-center gap-4 mt-10">
        <text className="text-white font-semibold text-4xl">Features</text>
        <text className="text-white text-xl">
          Designed for a transparent, independent partnership, offering a chance
          to join a <br />
          community that promotes broader opportunities & growth.
        </text>
      </div>
      <div className="mx-24 my-12 py-16 grid  grid-cols-3 bg-white  rounded-2xl">
        <div className="grid grid-flow-row justify-center text-center ">
          <text className="text-app-moss font-semibold text-6xl">Direct</text>
          <text className="text-app-gray900 text-lg font-semibold mt-3">
            Client Placement
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <text className="text-app-moss font-semibold text-6xl">MSP</text>
          <text className="text-app-gray900 text-lg font-semibold mt-3">
            Partner Placement
          </text>
        </div>
        <div className="grid grid-flow-row justify-center text-center ">
          <text className="text-app-moss font-semibold text-6xl">Self</text>
          <text className="text-app-gray900 text-lg font-semibold mt-3">
            Sourced Placement
          </text>
        </div>
      </div>
    </div>
  );
};

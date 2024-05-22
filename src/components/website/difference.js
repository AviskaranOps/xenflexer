import { Divider } from "@mui/material";
import React from "react";

export const Difference = () => {
  function createData(feature, xenspire, others, benefits) {
    return { feature, xenspire, others, benefits };
  }

  const rows = [
    createData(
      "COMPENSATION",
      "Structured tiered fixed-fee program to define our share",
      "% of Bill Rate",
      "Value-based Pricing to bring complete Transparency"
    ),
    createData(
      "OPERATIONS",
      "Platform Driven Communication",
      "Back & Forth Phone/Email",
      "Transparency & Autonomy with defined SLAs to respect time"
    ),
    createData(
      "BENEFITS",
      "Ala Carte Services for Various Insurance types, 401K, Immigration, HSA, etc.",
      "Non-standard, but predominantly based on a tiered percentage cut",
      "Flexibility to choose"
    ),
    createData(
      "COLLABORATION",
      "Open Forum Structure to communicate with other Consultants. All Metrics are displayed openly across the network",
      "Not Structured",
      "Clear Expectations & Transparent Operations since the Employer has a lot to lose"
    ),
    createData(
      "COMMUNITY",
      "All Consultants are part of a larger Xenspire Community program/network to yield all the benefits of being together.",
      "NO COMMUNITY",
      "Consultants can grow and improve during their Careers. Opportunity to join Direct Client/Permanent Placement"
    ),
  ];

  return (
    <div className="px-12 md:px-20 lg:px-40 py-10 bg-app-moss overflow-scroll">
      <div className="mt-5 grid grid-flow-row justify-center gap-4 text-center">
        <text className="text-white text-4xl font-semibold">
          Unleash the Power of Your Contracting Potential
        </text>
        <text className="text-white text-lg">
          Earn more and manage freely with <b>XenFlexer</b>. Outshine the
          industry with tailored benefits,
          <br /> boundless growth, and a community that learns and prospers
          together.
        </text>
      </div>
      <div className="rounded-lg bg-white mt-10" style={{ minWidth: 650 }}>
        <div
          className="grid grid-cols-4 px-3 bg-app-table rounded-ss-lg rounded-se-lg py-2"
          style={{ minWidth: 400 }}>
          <div>
            <text className="text-white font-semibold text-base">FEATURE</text>
          </div>
          <div className="grid grid-flow-col justify-start">
            <Divider
              orientation="vertical"
              sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 3 }}
            />
            <text className="text-white font-semibold text-base">XENSPIRE</text>
          </div>
          <div className="grid grid-flow-col justify-start">
            <Divider
              orientation="vertical"
              sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 3 }}
            />
            <text className="text-white font-semibold text-base">OTHERS</text>
          </div>
          <div className="grid grid-flow-col justify-start">
            <Divider
              orientation="vertical"
              sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 3 }}
            />
            <text className="text-white font-semibold text-base">BENEFITS</text>
          </div>
        </div>
        {rows.map((row) => (
          <div
            key={row.feature}
            className="grid grid-cols-4 px-3 border-t-2 border-t-app-border py-1">
            <div>
              <p>{row.feature}</p>
            </div>
            <div className="grid grid-flow-col justify-start">
              <Divider
                orientation="vertical"
                sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 2 }}
              />
              <p>{row.xenspire}</p>
            </div>
            <div className="grid grid-flow-col justify-start">
              <Divider
                orientation="vertical"
                sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 2 }}
              />
              <p>{row.others}</p>
            </div>
            <div className="grid grid-flow-col justify-start">
              <Divider
                orientation="vertical"
                sx={{ borderWidth: 1, borderColor: "#B9B9B9", marginRight: 2 }}
              />
              <p>{row.benefits}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

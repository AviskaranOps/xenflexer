import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import logo from "../../assets/images/app-logo.png";
import drop from "../../assets/images/chevron-down.png";
import avtar from "../../assets/images/Avatar.png";
import logout from "../../assets/images/log-out.png";
import home from "../../assets/images/home-icon.png";
import profile from "../../assets/images/profile-icon.png";
import setting from "../../assets/images/setting-icon.png";
import dash from "../../assets/images/dashboard-icon.png";
import time from "../../assets/images/timesheets-icon.png";
import doc from "../../assets/images/document-icon.png";
import { Search } from "@mui/icons-material";

export const SideNav = () => {
  const name = [
    { name: "Home", icon: home },
    { name: "Profile", icon: profile },
    { name: "Documents", icon: doc },
    { name: "Dashboards", icon: dash },
    { name: "Timesheets", icon: time },
    { name: "Settings", icon: setting },
  ];
  return (
    <aside className="fixed h-screen w-72 bg-app-gray grid content-around">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-fit px-10" />
      </div>
      <div>
        <div className="m-2 rounded-md  bg-app-lightGreen ">
          <TextField
            size="small"
            fullWidth
            placeholder="search"
            style={{ color: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#E9D7FE" }} />
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "#E9D7FE" }, borderColor: "#7B964A" }}
          />
        </div>

        {name.map((data, index) => {
          return (
            <div
              key={index}
              className="bg-app-green m-2 grid-flow-col grid justify-between p-2 rounded-md">
              <div className="grid-flow-col grid">
                <img src={data.icon} alt="icon" className="w-5" />
                <text style={{ color: "white", fontSize: 14, marginLeft: 10 }}>
                  {data.name}
                </text>
              </div>
              <img src={drop} alt="drop" className="w-5" />
            </div>
          );
        })}
      </div>
      <div className="mx-6 border-t-2 border-app-cycle mb-10">
        <div className="grid grid-flow-col mt-3 justify-between">
          <div>
            <img src={avtar} className="w-10" alt="avtar" />
          </div>
          <div className="grid grid-flow-row">
            <text style={{ fontSize: 12 }}>User Name</text>
            <text style={{ fontSize: 12 }}>User@gmail.com</text>
          </div>
          <div>
            <img src={logout} className="w-10" alt="avtar" />
          </div>
        </div>
      </div>
    </aside>
  );
};

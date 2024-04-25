import React from "react";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import logo from "../../assets/images/lOGO 1.png";
import line from "../../assets/images/Line pattern.png";
import profile from "../../assets/images/Untitled design (5) 1.png";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {

  const navigate = useNavigate();


  const routeLogin = () => {
    navigate('/login');
  }

  const routeRegister = () => {
    navigate('/signup');
  }
  
  return (
    <div>
      {/* nav bar */}
      <nav className="p-3 grid grid-flow-col items-center justify-around px-12">
        <div>
          <img src={logo} alt="logo" />
        </div>

        <ul className="grid grid-flow-col gap-8">
          <li className="text-app-gray font-bold">
            <a href="#home">Home</a>
          </li>
          <li className="text-app-gray font-bold">
            <a href="#partners">
              Partners <KeyboardArrowDownOutlined />
            </a>
          </li>
          <li className="text-app-gray font-bold">
            <a href="#resources">
              Resources <KeyboardArrowDownOutlined />
            </a>
          </li>
          <li className="text-app-gray font-bold">
            <a href="#contactUs">Contact Us</a>
          </li>
        </ul>

        <div className="grid grid-flow-col gap-4 items-center">
          <text className="text-app-gray text-base font-black">Flexer</text>
          <Button
            key="one"
            variant="contained"
            onClick={routeRegister}
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#669F2A",
            }}>
            Register
          </Button>
          <Button
            key="three"
            sx={{
              color: "#344054",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#D0D5DD",
            }}
            onClick={routeLogin}
            variant="outlined">
            Login
          </Button>
          <text className="text-app-gray text-base font-black">Client</text>
          <Button
            key="one"
            variant="contained"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#4F7A21",
            }}>
            Hire
          </Button>
        </div>
      </nav>

      {/* box */}
      <div>
        <Box
          sx={{
            height: 540,
            width: "auto",
            backgroundColor: "#4F7A21",
            borderRadius: "24px",
            mx: 20,
          }}>
          <div className="pt-20 grid grid-flow-row gap-5 justify-center text-center">
            <text className="text-white font-bold text-5xl ">
              Revolutionizing Contract Work
              <br /> with Corporate Perks
            </text>
            <text className="text-app-moss200 text-xl mt-4">
              We're pioneering the crowdstaffing revolution, providing a unique
              platform where <br /> contractors can embrace the flexibility of
              contract work without sacrificing the
              <br /> perks of corporate life.
            </text>
          </div>
          <div className="flex justify-center mt-10">
            <div className="grid grid-flow-row">
              <input
                placeholder="Enter your email"
                style={{
                  backgroundColor: "#ffffff",
                  marginRight: 15,
                  width: 335,
                  borderRadius: 7,
                  padding: 8,
                }}
              />
              <text className="text-app-moss200 text-sm mt-2">
                We care about your data in our{" "}
                <a
                  style={{ textDecorationLine: "underline" }}
                  href="#privacypolicy">
                  privacy policy.
                </a>
              </text>
            </div>

            <Button
              variant="contained"
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#669F2A",
                height: 42,
              }}>
              Get Started
            </Button>
          </div>
        </Box>

        <div className="flex justify-center -mt-20">
          <Box className="shadow-2xl bg-white rounded-3xl px-10">
            <div className="flex justify-center text-center mt-7">
              <text className="text-app-gray900 text-lg font-semibold">
                Introducing XenFlexer across multiple industry verticals
              </text>
            </div>
            <div className="flex justify-center ">
              <img src={profile} alt="people" style={{ width: 700 }} />
            </div>
            <div className="grid grid-flow-col text-center pl-10 pb-5">
              <text className="text-app-gray900 text-lg font-semibold">IT</text>
              <text className="text-app-gray900 text-lg font-semibold">
                Helth Care
              </text>
            </div>
          </Box>
        </div>
      </div>
      {/* images line */}
      <img src={line} alt="line1" className="absolute bottom-0 left-0" />
      <img src={line} alt="line1" className="absolute -bottom-80 right-0" />
    </div>
  );
};


export default Main;
import React from "react";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import logo from "../../assets/images/lOGO 1.png";
import  axios  from 'axios';
import { Header } from "./header";
import { Footer } from "./footer";
import sales  from "../../assets/images/sales.png"
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const ContactUp = () => {
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const first_name = fname;
    const last_name = lname;
    const work_email = email;
    const message = msg;
      await axios.post("http://localhost:8080/xen/contactSales/", {
        first_name,
        last_name,
        work_email,
        message
      }).then(response => {
        console.log("success");
        navigate('/');
      }).
      catch (error => {
        message.error(error.response.data);
      })
    } 

  return (
    <>
      <Header />
      <div className="grid grid-flow-col bg-app-backGround">
        <div className="p-10 hidden sm:grid">
          <div className="grid justify-center text-center px-10">
            <text className="text-app-gray900 text-2xl font-semibold mt-5">
            Unlock More Value with Freedom and Transparency
            </text>
            <text className="text-black text-xs font-normal -mt-5">
              Experience the power of choice and clarity with every opportunity,
              only at
              <br /> XenFlexer. Powered by XenHire's precision matching, we
              offer an unrivaled blend
              <br /> of freedom and security. Dive into the best of both worlds
              with XenFlexer, where
              <br /> your contracting career meets unparalleled opportunities
              and benefits!
            </text>
          </div>
          <div className="justify-center items-center flex px-10">
            <img src={sales} alt="sales" />
          </div>
        </div>
        <div className="py-10 px-5 sm:pr-20">
          <div
            className="rounded-3xl border-app-moss500 p-3 bg-white shadow-2xl"
            style={{ borderWidth: 4, borderTopWidth: 6, borderRightWidth: 6 }}>
            <div className="grid gap-2 mt-3 justify-center px-6">
              <text className="text-app-gray900 font-semibold text-3xl">
                Contact Sales
              </text>
              <text className="text-app-gray font-normal text-base">
                Lets Gets the conversation started. Tell us a bit <br /> about
                yourself, and we will get in touch as soon as
                <br /> we can.
              </text>
            </div>
            <form onSubmit={handleSubmit} className="px-5">
              <div className="grid gap-2 mt-8 justify-center">
                <label className="text-app-gray700 text-sm font-medium">
                  First Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder="Enter your first name"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />
              </div>
              <div className="grid gap-2 mt-5 justify-center">
                <label className="text-app-gray700 text-sm font-medium">
                  Last Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Enter your last name"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />
              </div>
              <div className="grid gap-2 mt-5 justify-center">
                <label className="text-app-gray700 text-sm font-medium">
                  Work Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />
              </div>
              <div className="grid gap-2 mt-5 justify-center">
                <label className="text-app-gray700 text-sm font-medium">
                  Message<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Enter your message"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />
              </div>
              <div className="flex justify-center pb-8">
                <Button
                  variant="contained"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "#4F7A21",
                    marginTop: 3,
                  }}
                  type="submit">
                  Get Started
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

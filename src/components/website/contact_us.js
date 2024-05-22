import React from "react";
import { Header } from "./header";
import { Button } from "@mui/material";
import axios from "axios";
import logo from "../../assets/images/lOGO 1.png";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


export const Contact_Us = () => {
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [no, setNo] = React.useState("");
  const [company, setCompany] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const first_name = fname;
    const last_name = lname;
    const company_name = company; 
    const phone_number = no;
    const Reason_for_reaching_out = msg
        await axios.post("http://localhost:8080/xen/contactus/", {
          first_name,
          last_name,
          email,
          Reason_for_reaching_out,
          phone_number,
          company_name
        }).then(response => {
          navigate("/");
          message.success("Thanks for showing Interest");
          console.log("success");
        })
        .catch (error => {
          message.error(error.response.data);
        })
  }


  return (
    <div>
      <Header />
      <div className="justify-center text-center p-10 gap-3 bg-app-moss200 hidden sm:grid">
        <text className="text-app-gray900 font-semibold text-3xl">
          Contact With us today
        </text>
        <text className="text-app-gray900 font-medium text-base">
          Complete the form below to get in touch (or check out the additional
          optios below). We'll get back to you as soon as possible.
        </text>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 sm:px-64">
          <div className="grid grid-flow-row sm:grid-flow-col  sm:gap-10">
              <div className="grid mt-5">
                <label className="text-app-moss500 text-sm font-medium">
                  First Name*
                </label>
                <input
                  required
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder="Enter your first name"
                  className="border p-2 border-app-border rounded-md w-full"
                />
              </div>
              <div className="grid mt-5">
                <label className="text-app-moss500 text-sm font-medium">
                  Last Name*
                </label>
                <input
                  required
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Enter your last name"
                  className="border p-2 border-app-border rounded-md w-full"
                />
              </div>
            </div>
            <div className="grid mt-5">
              <label className="text-app-moss500 text-sm font-medium">
                Email*
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="border p-2 border-app-border rounded-md w-full"
              />
            </div>
            <div className="grid mt-3">
              <label className="text-app-moss500 text-sm font-medium">
                Phone number
              </label>
              <input
                type="tel"
                value={no}
                onChange={(e) => setNo(e.target.value)}
                placeholder="Enter your phone number"
                className="border p-2 border-app-border rounded-md w-full"
              />
            </div>
            <div className="grid mt-3">
              <label className="text-app-moss500 text-sm font-medium">
                company name*
              </label>
              <input
                required
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter your company name"
                className="border p-2 border-app-border rounded-md w-full"
              />
            </div>
            <div className="grid mt-5">
              <label className="text-app-moss500 text-sm font-medium">
                Reason for reachoing Out
              </label>
              <textarea
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Enter your message"
                className="border p-2 border-app-border rounded-md w-full"
              />
            </div>
            <div>
              <text className="text-app-gray">
                xenspire needs the contactinformation you provide to us to
                contact you about our products and services.you may unsubscribe
                from these communications at any time. For information on how to
                unsubscribe, as well as our privacy practices and commitment to
                protecting your privacy.{" "}
                <a className="underline text-app-gray900 font-semibold">
                  please review our privacy policy
                </a>
              </text>
            </div>
            <Button
              variant="contained"
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#4F7A21",
                marginTop: 3,
                width: 250,
              }}
              type="submit">
              Contact Me
            </Button>
          </div>
        </form>
      </div>
      <footer className="w-full md:px-28 mt-20 mb-10 grid grid-flow-col items-center justify-between">
        <img src={logo} alt="logo" />
        <text style={{ color: "#667085" }}>
          © 2024 Xenspire. All rights reserved.
        </text>
      </footer>
    </div>
  );
};

import React from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import signup from "../../assets/images/signup.png";
import logo from "../../assets/images/lOGO 1.png";
import { type } from "@testing-library/user-event/dist/type";
import axios from 'axios';
import { Header } from "./header";
import Box from '@mui/material/Box';
import { Footer } from "./footer";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const Register = () => {
  const history = useLocation();
  console.log(history.state);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [no, setNo] = React.useState("");
  const [typeJob, setTypeJob] = React.useState("");
  const [joinTeam, setJoinTeam] = React.useState("");
  const [jobbType, setJobbType] = React.useState("");
  const jobType = ["Permanent Position", "Contract Position"];

  const job = [
    "Join with a new contract found by XenFlexer",
    "Join XenFlexer with a new contract I secure independently",
    "Join XenFlexer with my current ongoing project",
  ];

  const position = [
    "Permanent Positions",
    "Contract Positions"
  ]


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const full_name = name;
    const phone_number = no;
    const job_type = typeJob;
    const contract_type = jobbType.toString();
    const joining_preference = joinTeam.toString();
      await axios.post("https://xenflexer.northcentralus.cloudapp.azure.com/xen/interestSignup", {
        full_name,
        email,
        phone_number,
        job_type,
        contract_type,
        joining_preference
      }).then(response => {
        console.log("success");
        navigate('/')
        message.success("Thanks for showing Interest");
      })
      .catch (error => {
        message.error(error.response.data);
    })
  }

  const handleAccesCheckboxChangeTeam = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setJoinTeam([...joinTeam, value]); // Add
    } else {
      setJoinTeam(joinTeam.filter((data) => data !== value)); // Remove
    }
  };


  const handleAccesCheckboxChangeType = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setJobbType([...jobbType, value]); // Add
    } else {
      setJobbType(jobbType.filter((data) => data !== value)); // Remove
    }
  };



  return (
    <>
      <Header />
      <div className="grid grid-flow-col bg-app-backGround">
        <div className="p-10 hidden sm:grid">
          <div className="grid justify-center text-center px-10">
            <text className="text-app-gray900 text-xl font-extrabold mt-5">
              Disrupting the Enterprise Contracting Landscape
            </text>
            <text className="text-app-gray text-xs italic font-medium mt-5">
              Welcome to the XenFlexer Interest Signup, where we're reshaping
              the future of enterprise contracting.
              <br /> XenFlexer is at the forefront of revolutionizing the
              contracting industry by offering unparalleled flexibility,
              <br /> transparency, and opportunities for consultants and clients
              alike. Whether you're a seasoned professional
              <br /> looking for entry-level or advanced opportunities, or
              seeking the right blend of permanent and contract
              <br /> positions, XenFlexer is your gateway to a world where your
              skills are valued and your career aspirations are met.
              <br /> Sign up today to be part of a community that's set on
              disrupting the enterprise contracting landscape, ensuring
              <br /> a more equitable, efficient, and empowering environment for
              everyone involved.
            </text>
          </div>
          <div className="justify-center items-center flex px-10">
            <img src={signup} alt="signup" />
          </div>
        </div>
        <div className="py-10 px-5 sm:pr-20">
          <div
            className="rounded-3xl border-app-moss500 p-3 bg-white shadow-2xl"
            style={{
              borderWidth: 4,
              borderTopWidth: 6,
              borderRightWidth: 6,
            }}>
            <div className="flex justify-center mt-3 px-6">
              <text className="text-app-gray900 font-semibold text-3xl">
                XenFlexer Interest Signup
              </text>
            </div>
            <form
              onSubmit={handleSubmit}
              className="px-5 sm:px-0 sm:ml-12 lg:ml-24 sm:mr-5">
              <div className="grid mt-8 gap-6 ">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />

                <input
                  required
                  type="tel"
                  value={no}
                  onChange={(e) => setNo(e.target.value)}
                  placeholder="Enter your phone number"
                  className="border p-2 border-app-border rounded-md sm:w-80"
                />
              </div>
              <div className="grid mt-8  items-center ">
                <label className="text-app-gray700 text-base font-medium pb-1">
                  Type of job opportunities interested in?
                  <span style={{ color: "red" }}>*</span>
                </label>
                <RadioGroup
                  row
                  value={typeJob}
                  onChange={(e) => setTypeJob(e.target.value)}>
                  <FormControlLabel
                    name="non-entry"
                    value={"non-entry"}
                    control={<Radio size="small" color="success" />}
                    label={
                      <span style={{ fontSize: 13 }}>
                        Non-Entry-Level Positions
                      </span>
                    }
                    sx={{ color: "#344054" }}
                  />
                  <FormControlLabel
                    name="entry"
                    value={"entry"}
                    control={<Radio size="small" color="success" />}
                    label={
                      <span style={{ fontSize: 13 }}>
                        Entry-Level Positions
                      </span>
                    }
                    sx={{ color: "#344054" }}
                  />
                </RadioGroup>
              </div>
              <div className="grid mt-5  items-center">
                <label className="text-app-gray700 text-base font-medium pb-1">
                  Type of positions interested in?
                  <span style={{ color: "red" }}>*</span>
                </label>
                {jobType.map((options) => (
                  <FormControlLabel
                    key={options}
                    control={
                      <Checkbox
                        size="small"
                        value={options}
                        checked={jobbType.includes(options)}
                        onChange={handleAccesCheckboxChangeType}
                        color="success"
                      />
                    }
                    label={<span style={{ fontSize: 13 }}>{options}</span>}
                  />
                ))}
              </div>
              <div className="grid mt-5  items-center ">
                <label className="text-app-gray700 text-base font-medium">
                  Your prefer to join our team?
                </label>
                <label className="text-app-gray700 text-sm font-medium pb-1">
                  (Applicable only if you selected "Contract Positions" above.)
                  <span style={{ color: "red" }}>*</span>
                </label>
                {job.map((options) => (
                  <FormControlLabel
                    key={options}
                    control={
                      <Checkbox
                        size="small"
                        value={options}
                        checked={joinTeam.includes(options)}
                        onChange={handleAccesCheckboxChangeTeam}
                        color="success"
                      />
                    }
                    label={<span style={{ fontSize: 13 }}>{options}</span>}
                  />
                ))}
              </div>
              <div className="sm:-ml-12 lg:-ml-24 pb-5 flex justify-center">
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
                  Get Start
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

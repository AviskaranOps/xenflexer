import React from "react";
import {
  Button,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const My_Information = ({ next, back }) => {
  const [hearAboutUs, setHearAboutUs] = React.useState("");
  const [countre, setCountre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [no, setNo] = React.useState("");
  const [project, setProject] = React.useState("");
  const [xenspire, setXenspire] = React.useState("");
  const [doYouWant, setDoYouWant] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [comm, setComm] = React.useState([]);
  const [onNext, setOnNext] = React.useState(false);

  const yes_no = ["Yes", "No"];
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const navigate = useNavigate();

  const setLoginEmail = () => {
    let email = JSON.parse(localStorage.getItem("token")).email;
    setEmail(email);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getCountryAndComm",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        setCountries(response.data.country);
        setComm(response.data.communication);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  useEffect(() => {
    setLoginEmail();
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserInformation?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status != 204) {
          const data = response.data;
          setHearAboutUs(data.howDidYouHearAboutUs);
          setCountre(data.country);
          setDoYouWant(data.doYouWantXenspireToBe);
          data.email !== "" ? setEmail(data.email) : setLoginEmail();
          setNo(data.mobile);
          setProject(data.workingOnProject);
          setXenspire(data.xenspireIsTheEmployer);
          setOnNext(true);
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobile = no;
    const how_did_you_hear_about_us = hearAboutUs;
    const working_on_project = project;
    const country = countre.name;
    const xenspire_is_the_employer = xenspire;
    const do_you_want_xenspire_to_be = doYouWant;
    const user = JSON.parse(localStorage.getItem("token"));
    const my_info = true;
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/userInformation?userId=" +
          user.userId,
        {
          how_did_you_hear_about_us,
          country,
          xenspire_is_the_employer,
          email,
          mobile,
          working_on_project,
          do_you_want_xenspire_to_be,
          my_info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("Data saved successfully");
        console.log(response.data);
        setOnNext(true);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  return (
    <div>
      <form className="mx-80 mt-8" onSubmit={handleSubmit}>
        <div className="grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>
            How did you hear about Us?
          </FormLabel>
          <Select
            size="small"
            displayEmpty
            value={hearAboutUs}
            onChange={(e) => setHearAboutUs(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <text style={{ color: "#53783B" }}>Select from the list</text>
                );
              }
              return selected;
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72">
            {comm.map((name) => (
              <MenuItem key={name.name} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>Country</FormLabel>
          {/* <Select
            size="small"
            displayEmpty
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <text style={{ color: "#53783B" }}>Select the Country</text>
                );
              }
              return selected;
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72">
            {countries.map((name) => (
              <MenuItem key={name.name} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select> */}
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            value={countre}
            options={countries}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setCountre(newValue);
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "& .MuiAutocomplete-inputRoot": {
                color: "#53783B",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select the Country" />
            )}
          />
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>Email</FormLabel>
          <TextField
            size="small"
            type="email"
            placeholder="Enter Email"
            className="w-72"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              input: { color: "#53783B" },
            }}
          />
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>Mobile</FormLabel>
          <TextField
            size="small"
            type="tel"
            placeholder="Enter Mobile"
            className="w-72"
            value={no}
            onChange={(e) => setNo(e.target.value)}
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
              input: { color: "#53783B" },
            }}
          />
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>
            Working on the Project?
          </FormLabel>
          <Select
            size="small"
            displayEmpty
            value={project}
            onChange={(e) => setProject(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <text style={{ color: "#D1D1D1" }}>Yes / No</text>;
              }
              return selected;
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72">
            {yes_no.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>
            Xenspire is the Employer?
          </FormLabel>
          <Select
            size="small"
            displayEmpty
            value={xenspire}
            onChange={(e) => setXenspire(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <text style={{ color: "#D1D1D1" }}>Yes / No</text>;
              }
              return selected;
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72">
            {yes_no.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>
            Do you want Xenspire to be?
          </FormLabel>
          <Select
            disabled={xenspire === "Yes"}
            size="small"
            displayEmpty
            value={doYouWant}
            onChange={(e) => setDoYouWant(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <text style={{ color: "#D1D1D1" }}>Yes / No</text>;
              }
              return selected;
            }}
            sx={{
              color: "#53783B",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(123, 150, 74, 1)",
              },
              ".MuiSvgIcon-root ": {
                color: "#7B964A",
              },
            }}
            className="w-72">
            {yes_no.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mt-5 justify-end flex">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            disabled
            sx={{
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={back}>
            Previous
          </Button>
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            type="submit">
            Save
          </Button>
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            disabled={!onNext}
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={next}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

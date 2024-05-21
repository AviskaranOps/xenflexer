import React from "react";
import {
  Button,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  Card,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import { Country } from "country-state-city";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";

export const My_Information = ({ next }) => {
  const [hearAboutUs, setHearAboutUs] = React.useState("");
  const [countre, setCountre] = React.useState();
  const [email, setEmail] = React.useState("");
  const [no, setNo] = React.useState("");
  const [project, setProject] = React.useState("");
  const [xenspire, setXenspire] = React.useState("");
  const [doYouWant, setDoYouWant] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [comm, setComm] = React.useState([{ name: "abc" }]);

  const yes_no = ["Yes", "No"];

  const setLoginEmail = () => {
    let email = JSON.parse(localStorage.getItem("token")).email;
    setEmail(email);
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());

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
        // setCountries(response.data.country);
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
        if (response.status !== 204) {
          const data = response.data;
          setHearAboutUs(data.howDidYouHearAboutUs);
          setCountre(data.country);
          setDoYouWant(data.doYouWantXenspireToBe);
          data.email !== "" ? setEmail(data.email) : setLoginEmail();
          setNo(data.mobile);
          setProject(data.workingOnProject);
          setXenspire(data.xenspireIsTheEmployer);
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();
    const mobile = no;
    const how_did_you_hear_about_us = hearAboutUs;
    const working_on_project = project;
    const country = countre?.name;
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
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>
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
                      <text style={{ color: "#B1B2B2" }}>
                        Select from the list
                      </text>
                    );
                  }
                  return selected;
                }}
                className="w-72">
                {comm.map((name) => (
                  <MenuItem key={name.name} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>Country</FormLabel>
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
                className="w-72"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Country" />
                )}
              />
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>Email</FormLabel>
              <TextField
                size="small"
                type="email"
                placeholder="Enter Email"
                className="w-72"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "#b1b2b2" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>Mobile</FormLabel>
              <TextField
                size="small"
                type="tel"
                placeholder="Enter Mobile"
                className="w-72"
                value={no}
                onChange={(e) => setNo(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined sx={{ color: "#b1b2b2" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>
                Working on the Project?
              </FormLabel>
              <Select
                size="small"
                displayEmpty
                value={project}
                onChange={(e) => setProject(e.target.value)}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <text style={{ color: "#B1B2B2" }}>Yes / No</text>;
                  }
                  return selected;
                }}
                className="w-72">
                {yes_no.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>
                Xenspire is the Employer?
              </FormLabel>
              <Select
                size="small"
                displayEmpty
                value={xenspire}
                onChange={(e) => setXenspire(e.target.value)}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <text style={{ color: "#B1B2B3" }}>Yes / No</text>;
                  }
                  return selected;
                }}
                className="w-72">
                {yes_no.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#57595A" }}>
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
                    return <text style={{ color: "#B1B2B2" }}>Yes / No</text>;
                  }
                  return selected;
                }}
                className="w-72">
                {yes_no.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </Card>
        <div className="mt-5 justify-end flex">
          <Button
            style={{ color: "white" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#729434",
              "&:hover": {
                backgroundColor: "#729434",
              },
            }}
            type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
};

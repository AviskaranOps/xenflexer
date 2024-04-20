import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UploadFileOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

export const My_Experience = ({ next }) => {
  const [jonTitle, setJobTitle] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState({ start: "", end: "" });
  const [file, setFile] = React.useState("");
  const [radioValue, setRadioValue] = React.useState(false);
  const [school, setSchool] = React.useState("");
  const [graduation, setGraduation] = React.useState("");
  const [field, setfield] = React.useState("");
  const [educatoinDate, setEduactionDate] = React.useState({
    start: "",
    end: "",
  });

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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/experiance/",
        {
          companyName,
          location,
          file,
          jonTitle,
          field,
          date,
          radioValue,
          school,
          graduation,
          educatoinDate,
        }
      );

      if (response.status === 200) {
        console.log("user experience save successfully");
      } else {
        console.log("experience save failed");
      }
    } catch (error) {
      console.error("experience save error:", error.message);
    }
  };

  return (
    <div>
      <form className="mx-40" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Resume
          </text>
          <div>
            <text className="text-app-border mr-10">
              {file ? file : "Please upload your Resume"}
            </text>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              style={{
                color: "#344054",
                borderColor: "#53783B",
              }}
              startIcon={<UploadFileOutlined />}>
              Upload Resume/CV
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => setFile(e.target.value)}
              />
            </Button>
          </div>
        </div>
        <div className="mt-3 grid grid-flow-col justify-between ">
          <div className="grid grid-flow-row gap-2">
            <FormLabel style={{ color: "#344054" }}>Job Title</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Title"
              className="w-72"
              value={jonTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-flow-row gap-2 ">
            <FormLabel style={{ color: "#344054" }}>Company Name</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Company"
              className="w-72"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-flow-col justify-between ">
          <div className="grid grid-flow-row gap-2 ">
            <FormLabel style={{ color: "#344054" }}>Select Period</FormLabel>
            <div className="grid grid-flow-col gap-2">
              <TextField
                size="small"
                className="w-36"
                type="date"
                value={date.start}
                onChange={(e) => setDate({ ...date, start: e.target.value })}
              />
              <TextField
                size="small"
                className="w-36"
                type="date"
                value={date.end}
                disabled={radioValue ? true : false}
                onChange={(e) => setDate({ ...date, end: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-flow-row gap-2">
            <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Location"
              className="w-72"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-flow-col justify-between ">
          <div className="border border-app-gray rounded-md  px-3">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={radioValue}
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.checked)}
                  color="success"
                />
              }
              label="This is my Current company"
            />
          </div>
          <div className="w-72 justify-center flex">
            <Button
              style={{ color: "white", borderColor: "#7F56D9" }}
              variant="contained"
              sx={{
                backgroundColor: "#7B964A",
                "&:hover": {
                  backgroundColor: "#7B964A",
                },
              }}>
              Add Experiance
            </Button>
          </div>
        </div>
        {/* education */}
        <>
          <div className="mt-5 flex justify-start">
            <text
              style={{
                color: "#53783B",
                fontWeight: "bold",
                fontSize: 28,
              }}>
              Education
            </text>
          </div>
          <div className="mt-3 grid grid-flow-col justify-between ">
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>
                School/University
              </FormLabel>
              <TextField
                size="small"
                placeholder="Enter School/University"
                className="w-72"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div className="grid grid-flow-row gap-2 ">
              <FormLabel style={{ color: "#344054" }}>Graduation </FormLabel>
              <Select
                size="small"
                displayEmpty
                value={graduation}
                onChange={(e) => setGraduation(e.target.value)}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <text style={{ color: "#667085" }}>
                        Select Graduation
                      </text>
                    );
                  }
                  return selected;
                }}
                className="w-72">
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="my-3 grid grid-flow-col justify-between ">
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>Field of Study</FormLabel>
              <TextField
                size="small"
                placeholder="Enter Field of Study"
                className="w-72"
                value={field}
                onChange={(e) => setfield(e.target.value)}
              />
            </div>
            <div className="grid grid-flow-row gap-2 ">
              <FormLabel style={{ color: "#344054" }}>Select Period</FormLabel>
              <div className="grid grid-flow-col gap-2">
                <TextField
                  size="small"
                  className="w-36"
                  type="date"
                  value={educatoinDate.start}
                  onChange={(e) =>
                    setEduactionDate({
                      ...educatoinDate,
                      start: e.target.value,
                    })
                  }
                />
                <TextField
                  size="small"
                  className="w-36"
                  type="date"
                  value={educatoinDate.end}
                  onChange={(e) =>
                    setEduactionDate({ ...educatoinDate, end: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="justify-end flex">
            <div className="w-72 justify-center flex">
              <Button
                style={{ color: "white", borderColor: "#7F56D9" }}
                variant="contained"
                sx={{
                  backgroundColor: "#7B964A",
                  "&:hover": {
                    backgroundColor: "#7B964A",
                  },
                }}>
                Add Education
              </Button>
            </div>
          </div>
        </>
        <div className="mt-5 justify-end flex">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
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

import React from "react";
import {
  Button,
  FormLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { UploadFileOutlined } from "@mui/icons-material";

export const My_Experience = ({ next }) => {
  const [graduation, setGraduation] = React.useState("");
  const [radioValue, setRadioValue] = React.useState("");

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

  const handleClick = (e) => {
    e.preventDefault();
    console.log("My_Information");
  };

  return (
    <div>
      <form className="mx-40" onSubmit={handleClick}>
        <div className="flex justify-center">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Work Experience
          </text>

          <Button
            size="small"
            style={{
              color: "#344054",
              borderColor: "#53783B",
              position: "absolute",
              right: 30,
            }}
            variant="outlined"
            startIcon={<UploadFileOutlined />}>
            Upload Resume/CV
          </Button>
        </div>
        <div className="mt-3 grid grid-flow-col justify-between ">
          <div className="grid grid-flow-row gap-2">
            <FormLabel style={{ color: "#344054" }}>Job Title</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Title"
              className="w-72"
            />
          </div>
          <div className="grid grid-flow-row gap-2 ">
            <FormLabel style={{ color: "#344054" }}>Company Name</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Company"
              className="w-72"
            />
          </div>
        </div>
        <div className="mt-3 grid grid-flow-col justify-between ">
          <div className="grid grid-flow-row gap-2">
            <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
            <TextField
              size="small"
              placeholder="Enter Location"
              className="w-72"
            />
          </div>
          <div className="grid grid-flow-row gap-2 ">
            <FormLabel style={{ color: "#344054" }}>Select Period</FormLabel>
            <div className="grid grid-flow-col">
              <TextField size="small" className="w-36" type="date" />
              <TextField size="small" className="w-36" type="date" />
            </div>
          </div>
        </div>
        <div className="border border-app-gray rounded-md mt-3 grid grid-flow-col justify-start ">
          <Radio
            checked={radioValue === "radio"}
            value={"radio"}
            onChange={(e) => setRadioValue(e.target.value)}
            color="success"
            size="small"
            sx={{ alignItems: "flex-start" }}
          />
          <div className="grid grid-flow-row py-2">
            <text style={{ color: "#344054" }}>This is my Current company</text>
            <text style={{ color: "#475467" }}>
              You are selecting above as your current comapny
            </text>
          </div>
        </div>
        {/* education */}
        <div className="mt-5 flex justify-center">
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
                    <text style={{ color: "#667085" }}>Select Graduation</text>
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
            />
          </div>
          <div className="grid grid-flow-row gap-2 ">
            <FormLabel style={{ color: "#344054" }}>Select Period</FormLabel>
            <div className="grid grid-flow-col">
              <TextField size="small" className="w-36" type="date" />
              <TextField size="small" className="w-36" type="date" />
            </div>
          </div>
        </div>
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

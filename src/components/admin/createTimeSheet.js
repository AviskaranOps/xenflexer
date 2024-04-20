import React from "react";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";

export const CreateTimeSheet = ({ add_Data }) => {
  const [name, setName] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [toFrom, setToFrom] = React.useState("");
  const [aplication, setAplication] = React.useState([]);

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
    let data = {
      name: name,
      from: from,
      toFrom: toFrom,
      aplication: aplication,
    };
    add_Data(data);
    console.log(data);
  };

  return (
    <div>
      <form className="mt-16 mx-14" onSubmit={handleClick}>
        <div className="grid grid-flow-col justify-between items-center">
          <FormLabel style={{ color: "#344054" }}>Name</FormLabel>
          <TextField
            required
            size="small"
            label="Select name"
            className="w-72"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <FormLabel style={{ color: "#344054" }}>From Date</FormLabel>
          <TextField
            required
            size="small"
            type="date"
            className="w-72"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
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
          <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
          <TextField
            required
            size="small"
            type="date"
            className="w-72"
            value={toFrom}
            onChange={(e) => setToFrom(e.target.value)}
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
          <FormLabel style={{ color: "#344054" }}>Applicable To</FormLabel>
          <Select
            size="small"
            displayEmpty
            multiple
            value={aplication}
            onChange={(e) => setAplication(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <text style={{ color: "#53783B" }}>Select from the list</text>
                );
              }
              return selected + ", ";
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
            {names.map((name) => (
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
            sx={{
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

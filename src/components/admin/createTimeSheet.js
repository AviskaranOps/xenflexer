import React from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import axios from "axios";
import { message } from "antd";
import Select from "react-select";
import { useEffect } from "react";

export const CreateTimeSheet = ({ add_Data }) => {
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [applicable, setApplicable] = React.useState([]);
  const [userList, setUserList] = React.useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserList",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  // const names = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];

  const getOptionLabel = (option) => option.username;
  const getOptionValue = (option) => option.id;

  const handleClick = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(applicable);
    const selectedValues = applicable.map((option) => option.id);
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/createTimesheet?userId=" +
          user.userId,
        {
          name: name,
          startDate: startDate,
          endDate: endDate,
          userIdList: selectedValues,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("saved successfully");
      })
      .catch((error) => {
        console.error("volantary save error:", error.message);
      });
  };

  // const options = [
  //   { value: 1, label: 'roshan' },
  //   { value: 2, label: 'mohan' },
  //   { value: 3, label: 'mahi' }
  // ];

  const handleChange = (selectedOptions) => {
    setApplicable(selectedOptions);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="mx-32 pt-10 pb-20 w-full">
          <div className="flex justify-center">
            <text
              style={{
                color: "#53783B",
                fontWeight: "bold",
                fontSize: 28,
              }}>
              Create TimeSheet
            </text>
          </div>
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
                value={applicable}
                onChange={handleChange}
                options={userList}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                placeholder="Select..."
                isMulti // Allow multiple selections
                isSearchable // Enable searching
              />
              {/* <Select
                size="small"
                displayEmpty
                multiple
                value={applicable}
                onChange={(e) => setApplicable(e.target.value)}
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
              </Select> */}
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
      </div>
    </div>
  );
};

import React from "react";
import { Button, Card, FormLabel, TextField } from "@mui/material";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import axios from "axios";
import { message } from "antd";
import Select from "react-select";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const CreateTimeSheet = ({ add_Data }) => {
  const location = useLocation();
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

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

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
    <div className="min-h-screen bg-app-lightBlue pb-28">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="w-full mt-24 px-10">
          <div className="mt-1">
            {pathSegments.map((segment, index) => (
              <span
                key={index}
                className={`text-xl font-semibold ${
                  index === 0 ? "text-app-gray" : "text-app-gray900"
                }`}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                {index < pathSegments.length - 1 && " / "}
              </span>
            ))}
          </div>
          <form onSubmit={handleClick}>
            <Card sx={{ borderRadius: 5, p: 3, mt: 2, overflow: "visible" }}>
              <div className="grid grid-cols-3 gap-3">
                <div className="grid grid-flow-row">
                  <FormLabel style={{ color: "#344054" }}>Name</FormLabel>
                  <TextField
                    required
                    size="small"
                    placeholder="Select name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: 320 }}
                  />
                </div>
                <div className="grid grid-flow-col gap-4 justify-between">
                  <div className="grid grid-flow-row">
                    <FormLabel style={{ color: "#344054" }}>
                      From Date
                    </FormLabel>
                    <TextField
                      required
                      size="small"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-flow-row">
                    <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
                    <TextField
                      required
                      size="small"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-flow-row justify-end">
                  <FormLabel style={{ color: "#344054" }}>
                    Applicable To
                  </FormLabel>
                  <Select
                    value={applicable}
                    onChange={handleChange}
                    options={userList}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    placeholder="Select..."
                    isMulti // Allow multiple selections
                    isSearchable // Enable searching
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: 320,
                        zIndex: 2,
                      }),
                    }}
                  />
                </div>
              </div>
            </Card>
            <div className="my-5 justify-end flex">
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

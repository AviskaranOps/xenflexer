import React from "react";
import { Button, Select, MenuItem, FormLabel, Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloudUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { message } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { SideNavProfile } from "../widgets/sidenavProfile";
import { DummyData, get_Data } from "../utils/dummy";

export const DashboardTimeSheet = () => {
  const location = useLocation();
  const [timeSheet, setTimeSheet] = React.useState("");
  const [submittion, setSubmission] = React.useState("");
  const [array, setArray] = React.useState(DummyData);
  const [timesheets, setTimesheets] = React.useState([]);
  const [userTimesheet, setUserTimesheet] = React.useState([]);

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
  React.useState(() => {
    get_Data();
  }, []);

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheets?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTimesheets(response.data);
        setTimeSheet(response.data[0].name);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheetDetail?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data, "userTimeSheet");
        setUserTimesheet(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

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
    const user = JSON.parse(localStorage.getItem("token"));
    e.preventDefault();
    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/saveUserTimesheet",
        userTimesheet,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("saved successfully");
        setUserTimesheet(userTimesheet);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const handleTimesheetSelect = (e) => {
    const user = JSON.parse(localStorage.getItem("token"));
    setTimeSheet(e.target.value.name);
    console.log(e);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheetDetail?userId=" +
          user.userId +
          "&timesheetId=" +
          e.target.value.id,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserTimesheet(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const columns = [
    {
      field: "dateRange",
      headerName: "Date Range",
      minWidth: 400,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: false,
    },
    {
      field: "hoursWorked",
      headerName: "Hours",
      type: "number",
      width: 200,
      editable: true,
    },
  ];

  function saveDeviceCell(params) {
    const oldDevices = [...userTimesheet];

    const rowDeviceIndex = oldDevices.findIndex((dev) => dev.id === params.id);

    oldDevices[rowDeviceIndex] = {
      ...oldDevices[rowDeviceIndex],
      hoursWorked: params.hoursWorked,
    };

    setUserTimesheet(oldDevices);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNavProfile />
        <div className="my-20 w-full">
          <div className="pl-10 py-5 ">
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
          <Card sx={{ borderRadius: 5, m: 4, mt: 0 }}>
            <div className="grid grid-flow-col my-5 justify-between px-10">
              <div className="flex items-end">
                <Button
                  component="label"
                  variant="outlined"
                  style={{
                    color: "#729434",
                    borderColor: "#729434",
                    borderWidth: 2,
                    width: 300,
                    height: 42,
                  }}
                  startIcon={
                    <CloudUploadOutlined fontSize="large" color="success" />
                  }>
                  Proof Of Submission
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setSubmission(e.target.files[0])}
                  />
                </Button>
              </div>
              <div className="grid grid-flow-row">
                <FormLabel sx={{ color: "#344054" }}>
                  Select TimeSheet
                </FormLabel>
                <Select
                  size="small"
                  displayEmpty
                  value={timeSheet}
                  onChange={(e) => handleTimesheetSelect(e)}
                  renderValue={(selected) => {
                    if (selected?.length === 0) {
                      return (
                        <text style={{ color: "#B1B2B2" }}>
                          Select TimeSheet
                        </text>
                      );
                    }
                    return selected;
                  }}
                  className="w-72">
                  {timesheets.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* table  approval */}
            <div className="px-10 pb-5">
              <Box sx={{ height: 400 }}>
                <DataGrid
                  rows={userTimesheet}
                  columns={columns}
                  pageSizeOptions={false}
                  disableRowSelectionOnClick
                  hideFooter
                  editMode="row"
                  processRowUpdate={saveDeviceCell}
                />
              </Box>
            </div>
          </Card>
          <div className="my-6 px-10 flex justify-end">
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ color: "#ffffff", backgroundColor: "#53783B" }}>
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

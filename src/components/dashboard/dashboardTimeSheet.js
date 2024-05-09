import React from "react";
import {
  Button,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormLabel,
  TableContainer,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloudUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import { DummyData, get_Data } from "../utils/dummy";
import { SideNav } from "../widgets/sidenav";
import { useEffect } from "react";
import { message } from "antd";
import { DataGrid } from "@mui/x-data-grid";

export const DashboardTimeSheet = () => {
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getTimesheets",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTimesheets(response.data);
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
        console.log(response.data);
        setUserTimesheet(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
    }
  `;

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 1rem;
    max-height: 400px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

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
        <SideNav />
        <div className="mx-32 pt-10 pb-20 w-full">
          <div className="flex justify-center">
            <text
              style={{
                color: "#53783B",
                fontWeight: "bold",
                fontSize: 28,
              }}>
              Timesheet Dashboard
            </text>
          </div>
          <div className="my-8 grid grid-flow-col justify-around">
            <FormLabel sx={{ color: "#344054" }}>Select TimeSheet</FormLabel>
            <Select
              size="small"
              displayEmpty
              value={timeSheet}
              onChange={(e) => handleTimesheetSelect(e)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <text style={{ color: "#53783B" }}>Select TimeSheet</text>
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
              {timesheets.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <>
            {/* table  approval */}
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
            <div className="mt-6 grid grid-flow-col justify-around">
              <div>
                <text>{submittion ? submittion?.name : "Select File"}</text>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  style={{
                    color: "#344054",
                    borderColor: "#53783B",
                    marginLeft: 5,
                  }}
                  startIcon={
                    <CloudUploadOutlined fontSize="large" color="primary" />
                  }>
                  Proof of Submission
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setSubmission(e.target.files[0])}
                  />
                </Button>
              </div>

              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ color: "#ffffff", backgroundColor: "#53783B" }}>
                Submit for Approval
              </Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

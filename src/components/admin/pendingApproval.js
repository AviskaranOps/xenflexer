import React, { useEffect } from "react";
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
  TableContainer,
  TextField,
  Autocomplete,
  Card,
  InputAdornment,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import pdf from "../../assets/images/pdf-icon.png";
import avtar from "../../assets/images/Avatar.png";
import { Dummy_Pending } from "../utils/dummy";
import { SideNavAdmin } from "../widgets/sideNavAdmin";

export const PendingApproval = () => {
  const navigation = useNavigate();
  const history = useLocation();
  const [data, setData] = React.useState(Dummy_Pending);
  const [searchData, setSearchData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [pandingSearch, setPandingSearch] = React.useState("");
  const [timesheets, setTimesheets] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [userTimesheet, setUserTimesheet] = React.useState([]);
  const [pendingts, setPendingts] = React.useState([]);
  const [searchPendingData, setSearchPendingData] = React.useState([]);
  const [openDialoge, setOpenDialoge] = React.useState(false);
  //   const [userId, setUserId] = React.useState(0);
  //   const [timesheetId, setTimeSheetId] = React.useState(0);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = userTimesheet.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  let userId = -1;
  let timesheetId = -1;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    let State = history.state ? history.state : 1;
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserAndTimesheets",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTimesheets(response.data.timesheets);
        // timesheetId = response.data[0].id;
        setName(response.data.timesheets[State - 1].name);
        setUserList(response.data.users);
        setSearch(response.data.users[0].username);
        getUserPendingTimesheets(response.data.timesheets[State - 1].id);
        getUserTimesheetDetail(
          response.data.users[0].id,
          response.data.timesheets[State - 1].id
        );
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const getUserPendingTimesheets = (timesheetId) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log("timesheetId = " + timesheetId);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserPendingTS?timesheetId="+ timesheetId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data, "pending------");
        setSearchPendingData(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const pathSegments = history.pathname.split("/").filter((segment) => segment);

  const getUserTimesheetDetail = (userId, timesheetId) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(userId, timesheetId);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheetDetail?userId=" +
          userId +
          "&timesheetId=" +
          timesheetId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserTimesheet(response.data);
        // setName(response.data)
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const statusSelect = ["approved", "reject"];

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
    }
  `;

  const handlePendingApproval = (username, userId) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(name);
    setSearch(username);
    const tId = timesheets.find((item) => item["name"] === name);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheetDetail?userId=" +
          userId +
          "&timesheetId=" +
          tId.id,
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

  const handleUserSelectChange = (selected, type) => {
    let uId = userList.find((item) => item["username"] === selected);
    let tId = timesheets.find((item) => item["name"] === selected);
    console.log(uId, tId);
    if (type != "user")
      uId = userList.find((item) => item["username"] === search);
    if (type != "timesheet")
      tId = timesheets.find((item) => item["name"] === name);
    console.log(uId, tId, "check alll timr-------------");
    const user = JSON.parse(localStorage.getItem("token"));
    // const userd = JSON.parse(uId);
    // const timeshId = JSON.parse(tId);
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserTimesheetDetail?userId=" +
          uId.id +
          "&timesheetId=" +
          tId.id,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserTimesheet(response.data);
        getUserPendingTimesheets(tId.id);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const savePendingApproval = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/saveUserPendingTimesheet?userId=" + user.id,
        userTimesheet,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const statusChagehandler = (e, index) => {
    const newData = [...userTimesheet];
    newData[index].status = e;
    setData(newData);
  };

  const searchHandle = () => {
    const newData = data.find((d) => d.timesheetName === search);
    setSearchData(newData ? [newData] : data);
  };

  const pandingSearchHandler = () => {
    // const newData = data.find((d) => d.timesheetName === pandingSearch);
    const newData = data.filter((data) =>
      data.timesheetName.toLowerCase().includes(pandingSearch.toLowerCase())
    );

    setSearchPendingData(newData.length > 0 ? newData : data);
  };

  React.useEffect(() => {
    searchHandle();
  }, [search]);

  React.useEffect(() => {
    if (pandingSearch === "") {
      setSearchPendingData(data);
      return;
    }
    pandingSearchHandler();
  }, [pandingSearch]);

  //   const DownloadFile = () => {
  //     // const pdfUrl = URL.createObjectURL(require("../../assets/GIL Letter.pdf"));
  //     const pdfUrl = require("../../assets/Dummy_Pdf.pdf");
  //     const link = document.createElement("a");
  //     link.href = pdfUrl;
  //     link.download = "newPdf.pdf"; // specify the filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };

  //   const returnFileSize = (number) => {
  //     if (number < 1024) {
  //       return `${number} bytes`;
  //     } else if (number >= 1024 && number < 1048576) {
  //       return `${(number / 1024).toFixed(1)} KB`;
  //     } else if (number >= 1048576) {
  //       return `${(number / 1048576).toFixed(1)} MB`;
  //     }
  //   };

  return (
    <div className="min-h-screen bg-app-lightBlue pb-20">
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
          <div className="grid grid-flow-col gap-5">
            <Card sx={{ borderRadius: 5, mt: 2, height: 520 }}>
              <div className="p-8 grid grid-flow-col justify-between gap-3">
                <Autocomplete
                  freeSolo
                  size="small"
                  name="user"
                  options={userList.map((option) => option.username)}
                  value={search}
                  onChange={(event, newValue) => {
                    handleUserSelectChange(newValue, "user");
                    setSearch(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select user" />
                  )}
                  style={{ width: 233 }}
                />
                <Autocomplete
                  freeSolo
                  size="small"
                  options={timesheets.map((option) => option.name)}
                  name="timesheet"
                  value={name}
                  onChange={(event, newValue) => {
                    handleUserSelectChange(newValue, "timesheet");
                    setName(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select timesheet" />
                  )}
                  style={{ width: 233 }}
                />
                <div className="flex h-fit items-center ">
                  <img src={pdf} alt="pdf icon" width={28} height={25} />
                  <Button
                    style={{ color: "#729434", textDecoration: "underline" }}
                    onClick={() => {
                      setOpenDialoge(true);
                    }}>
                    View PDF
                  </Button>
                </div>
              </div>

              {/* table */}
              <div className="grid grid-flow-row w-full px-10 pb-3">
                <TableContainer sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    stickyHeader>
                    <StyledTableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            indeterminate={
                              selected.length > 0 &&
                              selected.length < userTimesheet.length
                            }
                            checked={
                              userTimesheet.length > 0 &&
                              selected.length === userTimesheet.length
                            }
                            onChange={handleSelectAllClick}
                            inputProps={{
                              "aria-label": "select all desserts",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "#19293B" }}>
                          NAME
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold", color: "#19293B" }}>
                          DATE
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold", color: "#19293B" }}>
                          HOURS
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold", color: "#19293B" }}>
                          STATUS
                        </TableCell>
                      </TableRow>
                    </StyledTableHead>
                    <TableBody>
                      {userTimesheet.map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}>
                            <TableCell
                              padding="checkbox"
                              onClick={(event) => handleClick(event, row.id)}>
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              style={{ color: "#475569" }}>
                              {row.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#475569" }}>
                              {row.date}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#475569" }}>
                              {row.hoursWorked}
                            </TableCell>
                            <TableCell align="center">
                              <Autocomplete
                                freeSolo
                                size="small"
                                options={statusSelect.map((option) => option)}
                                value={row.status}
                                onChange={(event, newValue) => {
                                  statusChagehandler(newValue, index);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Select Status"
                                  />
                                )}
                                sx={{
                                  color: "#363939",
                                  width: 159,
                                  ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(54, 57, 57, 1)",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "rgba(54, 57, 57, 1)",
                                    },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(54, 57, 57, 1)",
                                  },
                                  "& .MuiAutocomplete-inputRoot": {
                                    color: "#363939",
                                  },
                                  ".MuiSvgIcon-root ": {
                                    color: "#363939",
                                  },
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Card>
            <Card
              sx={{
                borderRadius: 5,
                mt: 2,
                minWidth: 250,
                maxWidth: 330,
                height: 520,
              }}>
              <div className="flex p-3 text-center justify-center">
                <p style={{ fontSize: 18, fontWeight: 600, color: "#729434" }}>
                  Pending Approval
                </p>
              </div>
              <div className="flex px-3 pb-3 justify-center ">
                <TextField
                  size="small"
                  placeholder="Search for User"
                  value={pandingSearch}
                  onChange={(e) => setPandingSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                  //   sx={{ minWidth: 280, maxWidth: 350 }}
                />
              </div>
              <div className="overflow-auto h-full px-5 pb-10">
                {searchPendingData.map((value, index) => {
                  return (
                    <div
                      className="grid grid-flow-col justify-start gap-5 my-2 items-center"
                      key={index}>
                      <img src={avtar} alt="user image" width={50} />
                      <p
                        // hover
                        // onClick={getUserTimesheetDetail(value.userId, value.timesheetId)}
                        style={{
                          color: "#000000",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        {value.username}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <div className="py-5 flex justify-end px-10">
            <Button
              onClick={savePendingApproval}
              variant="contained"
              style={{ backgroundColor: "#729434", color: "#ffffff" }}>
              APPROVAL
            </Button>
          </div>
        </div>
      </div>
      {/* Dualoge */}
      <Dialog
        open={openDialoge}
        onClose={() => {
          setOpenDialoge(false);
        }}
        PaperProps={{ sx: { width: 500, height: 600 } }}>
        <iframe
          // src={URL.createObjectURL(location.state)}
          src={require("../../assets/Dummy_Pdf.pdf")}
          title={"Dummy_Pdf"}
          width="100%"
          height="100%"
        />
      </Dialog>
    </div>
  );
};

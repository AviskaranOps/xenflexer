import React from "react";
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Button,
  FormLabel,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  DialogActions,
  Card,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dummy_Approval, get_Data } from "../utils/dummy";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Select from "react-select";
import {
  CloseOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";

export const AdminHome = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [applicable, setApplicable] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [id, setId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState("");
  const [selectStatus, setSelectStatus] = React.useState("");
  const [editableDialoge, setEditableDialoge] = React.useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setName(data?.name);
    setId(data?.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useState(() => {
    get_Data();
  }, []);

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const [timesheets, setTimesheets] = React.useState([]);

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

  const getOptionLabel = (option) => option.username;
  const getOptionValue = (option) => option.id;

  const handleClickDialoge = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(name, startDate, endDate);
    setDialogeOpen(false);
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

  const handleChangeDialoge = (selectedOptions) => {
    setApplicable(selectedOptions);
  };

  const onCloseDialoge = () => {
    setDialogeOpen(false);
    setName("");
    setStartDate("");
    setEndDate("");
    setApplicable("");
    setEditableDialoge(false);
  };

  const onEditDialoge = (data) => {
    setDialogeOpen(true);
    setName(data?.name);
    setStartDate(data?.startDate);
    setEndDate(data?.endDate);
    setId(data?.id);
  };

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

    ":hover": {
      backgroundColor: "#f9fafb",
      cursor: "pointer",
    },
  }));

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
      z-index: 0;
    }
  `;

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 1rem;
    max-height: 500px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

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
          <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
            <div className="grid grid-flow-col justify-between mb-5">
              <div className="grid grid-flow-col justify-start gap-5">
                <div>
                  <Select
                    value={selectStatus}
                    onChange={(e) => setSelectStatus(e)}
                    options={userList}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    placeholder="Select..."
                    isSearchable // Enable searching
                    styles={{
                      control: (base) => ({
                        ...base,
                        minWidth: 280,
                        maxWidth: 350,
                      }),
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    placeholder="Search for User"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 280, maxWidth: 350 }}
                  />
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#729434", color: "#ffffff" }}
                  onClick={() => {
                    setDialogeOpen(true);
                    setEditableDialoge(true);
                  }}>
                  Create
                </Button>
              </div>
            </div>
            {/* table */}
            <StyledTableContainer
              sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
              <Table aria-label="customized table" stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{ fontWeight: "bold", color: "#475467" }}>
                      Name
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold", color: "#475467" }}>
                      Start Date
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold", color: "#475467" }}>
                      End Date
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold", color: "#475467" }}>
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold", color: "#475467" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {timesheets.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell
                        align="left"
                        onClick={() => {
                          navigation("/admin/pendingApproval", {
                            state: row?.id,
                          });
                        }}>
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          navigation("/admin/pendingApproval", {
                            state: row?.id,
                          });
                        }}>
                        {row.startDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          navigation("/admin/pendingApproval", {
                            state: row?.id,
                          });
                        }}>
                        {row.endDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          navigation("/admin/pendingApproval", {
                            state: row?.id,
                          });
                        }}>
                        {row.status}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center items-center h-6 gap-2">
                          <IconButton onClick={() => onEditDialoge(row)}>
                            <EditOutlined color="success" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleClickOpen(row);
                            }}>
                            <DeleteOutlineOutlined color="error" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Card>
          {/* <div className="flex justify-end my-3">
            <Button
              variant="contained"
              style={{ backgroundColor: "#729434", color: "#ffffff" }}>
              SUBMIT FOR APPROVAL
            </Button>
          </div> */}
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={dialogeOpen}
        // onClose={onClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <div className="justify-center  text-center p-5">
            <DialogContentText
              sx={{
                color: "#53783B",
                fontWeight: "bold",
                fontSize: 22,
              }}>
              {editableDialoge ? "Create" : "Update"} TimeSheet
            </DialogContentText>
          </div>
          <div className="absolute right-3 top-3">
            <IconButton onClick={onCloseDialoge}>
              <CloseOutlined />
            </IconButton>
          </div>
          {/* main Data */}
          <div className="px-3 ">
            <form className="mt-4 mx-6" onSubmit={handleClickDialoge}>
              <div className="grid grid-flow-col justify-between items-center gap-8">
                <FormLabel style={{ color: "#344054" }}>Name</FormLabel>
                <TextField
                  required
                  size="small"
                  label="Select name"
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
                    maxWidth: 170,
                  }}
                />
              </div>
              <div className="mt-4 grid grid-flow-col justify-between items-center gap-8">
                <FormLabel style={{ color: "#344054" }}>From Date</FormLabel>
                <TextField
                  required
                  size="small"
                  type="date"
                  value={startDate}
                  disabled={!editableDialoge}
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
                    maxWidth: 170,
                  }}
                />
              </div>
              <div className="mt-4 grid grid-flow-col justify-between items-center gap-8">
                <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
                <TextField
                  required
                  size="small"
                  type="date"
                  value={endDate}
                  disabled={!editableDialoge}
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
                    maxWidth: 170,
                  }}
                />
              </div>
              <div className="mt-4 grid grid-flow-col justify-between items-center gap-4">
                <FormLabel style={{ color: "#344054" }}>
                  Applicable To
                </FormLabel>
                <Select
                  value={applicable}
                  onChange={handleChangeDialoge}
                  options={userList}
                  getOptionLabel={getOptionLabel}
                  getOptionValue={getOptionValue}
                  placeholder="Select..."
                  isMulti // Allow multiple selections
                  isSearchable // Enable searching
                  styles={{
                    control: (base) => ({
                      ...base,
                      minWidth: 170,
                      maxWidth: 350,
                    }),
                  }}
                />
              </div>
              <div className="mt-5 justify-end flex">
                <Button
                  style={{ color: "white", borderColor: "#7F56D9" }}
                  variant="contained"
                  onClick={handleClickDialoge}
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
        </DialogContent>
      </Dialog>
      {/* alert Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              You Are About Delete This
              <span style={{ fontWeight: "600" }}> {name}</span> TimeSheet
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

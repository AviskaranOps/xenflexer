import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CloseOutlined, Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { message } from "antd";
import SelectReact from "react-select";
import plusUser from "../../assets/images/user-plus-01.png";

export const AdminHome = () => {
  const navigation = useNavigate();
  const [search, setSearch] = React.useState("");
  const [array, setArray] = React.useState([]);
  const [oneOf, setOneof] = React.useState("");
  const [timesheets, setTimesheets] = React.useState([]);
  const [filterArray, setFilterArray] = React.useState([]);

  // dialoge data
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [applicable, setApplicable] = React.useState([]);
  const [userList, setUserList] = React.useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "http://localhost:8080/xen/getUsersActiveTS",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setArray(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const getOptionLabel = (option) => option.name || option.username;
  const getOptionValue = (option) => option.id;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "http://localhost:8080/xen/getTimesheets",
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
    setFilterArray(array);
  }, [array]);

  const filterSearch = () => {
    const data = array.filter((e) =>
      e?.username?.toLowerCase().includes(search?.toLowerCase())
    );
    setFilterArray(data ? data : array);
  };

  useEffect(() => {
    if (search === "") {
      return setFilterArray(array);
    }
    filterSearch();
  }, [search]);

  const onCloseDialoge = () => {
    setDialogeOpen(false);
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
  }));

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
    }
  `;

  const handleChangeDialoge = (selectedOptions) => {
    setApplicable(selectedOptions);
  };

  const handleClickDialoge = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("token"));
    console.log(applicable);
    const selectedValues = applicable.map((option) => option.id);
    await axios
      .post(
        "http://localhost:8080/xen/createTimesheet?userId=" +
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
    onCloseDialoge();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "http://localhost:8080/xen/getUserList",
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

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 1rem;
    max-height: 400px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;
  // max-height: 400px;
  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="py-16 px-10 w-full">
          <div className="px-10 mb-5 grid grid-flow-col justify-between">
            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Candidates"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className="w-72 bg-app-offWhite"
            />
            <Button
              style={{
                color: "white",
                borderColor: "#7F56D9",
                borderRadius: 25,
              }}
              variant="contained"
              sx={{
                backgroundColor: "#7B964A",
                "&:hover": {
                  backgroundColor: "#7B964A",
                },
              }}
              startIcon={
                <img src={plusUser} alt="plus" style={{ width: 16 }} />
              }
              onClick={() => setDialogeOpen(true)}>
              Create TimeSheet
            </Button>
          </div>
          {/* table */}

          <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
            <Table aria-label="customized table" stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Email
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    TimeSheet
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filterArray.map((row) => (
                  <StyledTableRow key={row.username}>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.timesheet}</TableCell>
                    <TableCell align="center">
                      <a
                        onClick={() => navigation("/admin/approval")}
                        className="underline hover:cursor-pointer hover:text-app-green">
                        Approve TimeSheet
                      </a>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <div className="mt-10 ml-10">
            {/* <Select
                value={oneOf}
                onChange={handleChange}
                options={timesheets}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                placeholder="Select Timesheet"
                isSearchable // Enable searching
            /> */}
            <Select
              size="small"
              required
              displayEmpty
              value={oneOf}
              onChange={(e) => setOneof(e.target.value)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <text style={{ color: "#667085" }}>TimeSheet Name</text>
                  );
                }
                return selected;
              }}
              className="w-72">
              {timesheets.map((data) => (
                <MenuItem key={data.id} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              style={{ color: "white", borderColor: "#7F56D9" }}
              variant="contained"
              sx={{
                marginLeft: 5,
                backgroundColor: "#7B964A",
                "&:hover": {
                  backgroundColor: "#7B964A",
                },
              }}>
              Download
            </Button>
          </div>
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
              Create TimeSheet
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
                <SelectReact
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
    </div>
  );
};

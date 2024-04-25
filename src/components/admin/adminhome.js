import React from "react";
import {
  Button,
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
import { Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DummyData } from "../utils/dummy";
import { Link, useNavigate } from "react-router-dom";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import { useEffect } from "react";
import axios  from "axios";

export const AdminHome = () => {
  const navigation = useNavigate();
  const [search, setSearch] = React.useState("");
  const [array, setArray] = React.useState(DummyData);
  const [oneOf, setOneof] = React.useState("");
  const [timesheets, setTimesheets] = React.useState([]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F9FAFB",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#F9FAFB",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const userId = 1;
      axios.get("https://xenflexer.northcentralus.cloudapp.azure.com/userTimesheets/").then( response => {
      console.log(response.data);
      if(response.status === 200){
        setArray(response.data);
      }
    })
    .catch(error => {
      console.error("experience save error:", error.message);
    })
  }, []);


  useEffect(() => {
    const userId = 1;
      axios.get("https://xenflexer.northcentralus.cloudapp.azure.com/timesheets/").then( response => {
      console.log(response.data);
      if(response.status === 200){
        setTimesheets(response.data);
      }
    })
    .catch(error => {
      console.error("experience save error:", error.message);
    })
  }, []);
  


  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #53783b;
    }
  `;

  const StyledTableContainer = styled(TableContainer)`
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    max-height: 400px;
  `;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin />
            <div className="py-16 px-10 w-full">
            <div className="ml-10 mb-5">
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
                className="w-72 bg-app-ligeen"
                />
            </div>
            {/* table */}
            <StyledTableContainer sx={{ borderWidth: 1 }}>
                <Table aria-label="customized table" stickyHeader>
                <StyledTableHead>
                    <TableRow>
                    <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#ffffff" }}>
                        Name
                    </TableCell>
                    <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#ffffff" }}>
                        Email
                    </TableCell>
                    <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#ffffff" }}>
                        TimeSheet
                    </TableCell>
                    <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#ffffff" }}>
                        Actions
                    </TableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {array.map((row) => (
                    <StyledTableRow key={row.name}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.timesheet}</TableCell>
                        <TableCell
                        align="center"
                        sx={{
                            backgroundColor:
                            row.status === "Pending" ? "#FFFFFF" : "#F9FAFB",
                        }}>
                        <Link to="/admin/pendingApproval">Approve Timesheet</Link>
                        </TableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </StyledTableContainer>

            <div className="mt-10 ml-10">
                <Select
                size="small"
                required
                displayEmpty
                value={oneOf}
                onChange={(e) => setOneof(e.target.value)}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <text style={{ color: "#667085" }}>TimeSheet Name</text>;
                    }
                    return selected;
                }}
                className="w-72">
                {DummyData.map((data) => (
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
    </div>
  );
};

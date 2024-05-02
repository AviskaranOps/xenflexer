import React from "react";
import {
  Button,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  FormLabel,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloudUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import { DummyData, get_Data } from "../utils/dummy";
import { SideNav } from "../widgets/sidenav";

export const DashboardTimeSheet = () => {
  const [timeSheet, setTimeSheet] = React.useState("");
  const [submittion, setSubmission] = React.useState("");
  const [array, setArray] = React.useState(DummyData);

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
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/dataTimesheet/",
        { timeSheet, submittion }
      );

      if (response.status === 200) {
        console.log("dataTimesheet save successfully");
      } else {
        console.log("dataTimesheet save failed");
      }
    } catch (error) {
      console.error("dataTimesheet save error:", error.message);
    }
    setTimeSheet("");
  };

  const handleHouerChange = (e, index) => {
    let newFormValues = [...array];
    newFormValues[index].hour = e.target.value;
    setArray(newFormValues);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav/>
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
              onChange={(e) => setTimeSheet(e.target.value)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <text style={{ color: "#53783B" }}>Select TimeSheet</text>;
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
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>

          {timeSheet ? (
            <>
              {/* table submit */}
              <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
                <Table aria-label="customized table" stickyHeader>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", color: "#475467" }}>
                        Date Range
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "#475467" }}>
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#475467" }}>
                        Hours
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#475467" }}>
                        Status
                      </TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {array.map((row) => (
                      <StyledTableRow key={row.name}>
                        <TableCell>
                          {row.from} to {row.tofrom}
                        </TableCell>
                        <TableCell>{row.from}</TableCell>

                        <TableCell align="center">{row.hour}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          {row.status === "Rejected" ? (
                            <Button
                              size="small"
                              variant="contained"
                              style={{
                                color: "#ffffff",
                                backgroundColor: "#53783B",
                              }}>
                              Resubmit
                            </Button>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              <div className="mt-6 flex justify-center">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  style={{ color: "#ffffff", backgroundColor: "#53783B" }}>
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* table  approval */}
              <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
                <Table aria-label="customized table" stickyHeader>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", color: "#475467" }}>
                        Date Range
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "#475467" }}>
                        Date
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#475467" }}>
                        Hours
                      </TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {array.map((row, index) => (
                      <StyledTableRow key={index}>
                        <TableCell>
                          {row.from} to {row.tofrom}
                        </TableCell>
                        <TableCell>{row.from}</TableCell>

                        <TableCell align="center">
                          <div className=" justify-center">
                            <input
                              value={row.hour}
                              className=" w-10  text-center"
                              onChange={(e) => handleHouerChange(e, index)}
                            />
                          </div>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              <div className="mt-6 grid grid-flow-col justify-around">
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  style={{ color: "#344054", borderColor: "#53783B" }}
                  startIcon={
                    <CloudUploadOutlined fontSize="large" color="primary" />
                  }>
                  Proof of Submission
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setSubmission(e.target.value)}
                  />
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  style={{ color: "#ffffff", backgroundColor: "#53783B" }}>
                  Submit for Approval
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

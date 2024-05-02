import React from "react";
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dummy_Approval, get_Data } from "../utils/dummy";
import { useNavigate } from "react-router-dom";
import { SideNavAdmin } from "../widgets/sideNavAdmin";

export const Approval = () => {
  const navigation = useNavigate();
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

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
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
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="mx-20 pt-10 pb-20 w-full">
          <div className="flex justify-center pb-10">
            <text
              style={{
                color: "#53783B",
                fontWeight: "bold",
                fontSize: 28,
              }}>
              Employee Approval
            </text>
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
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {Dummy_Approval.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    onClick={() => {
                      navigation("/admin/pendingApproval");
                    }}>
                    <TableCell align="center">{row.timesheetName}</TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor:
                          row.status === "Pending" ? "#FFFFFF" : "#F9FAFB",
                      }}>
                      {row.status}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </div>
    </div>
  );
};

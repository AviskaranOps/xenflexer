import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dummy_Payroll } from "../utils/dummy";
import { SideNav } from "../widgets/sidenav";

export const Payroll = () => {
  const [array, serArray] = React.useState(Dummy_Payroll);

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
      <div className="flex">
        <SideNav />
        <div className="py-16 px-40 w-full">
          <div className="ml-10 mb-5 justify-center flex">
            <text className="text-app-green text-3xl font-bold">Payroll</text>
          </div>

          {/* table */}
          <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
            <Table aria-label="customized table" stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", color: "#475467", width: 300 }}>
                    Type
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Amount
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Last Update
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {array.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell align="center">$ {row.amount}</TableCell>
                    <TableCell align="center">{row.lastUpdate}</TableCell>
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

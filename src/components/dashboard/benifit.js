import React from "react";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dummy_Benifits } from "../utils/dummy";
import { PopUp } from "../common/popup";
import { FiberManualRecord } from "@mui/icons-material";
import { SideNav } from "../widgets/sidenav";

export const Benifit = () => {
  const [array, serArray] = React.useState(Dummy_Benifits);
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [dialogeData, setDialogeData] = React.useState();

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
    max-height: 480px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  const onCloseDialoge = () => {
    setDialogeOpen(false);
  };

  const RenderStatus = ({ data }) => {
    let colorCode = "";
    let BgColorCode = "";
    if (data === "Active") {
      colorCode = "success";
      BgColorCode = "#ECFDF3";
    } else if (data === "Processing") {
      colorCode = "warning";
      BgColorCode = "#FFFAEB";
    } else if (data === "InActive") {
      colorCode = "error";
      BgColorCode = "#FEF3F2";
    }
    return (
      <Chip
        icon={<FiberManualRecord fontSize="10" />}
        label={data}
        color={colorCode}
        variant="outlined"
        style={{ backgroundColor: BgColorCode }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav />
        <div className="py-16 px-10 w-full">
          <div className="ml-10 mb-5 justify-center flex">
            <text className="text-app-green text-3xl font-bold">Benefits</text>
          </div>

          {/* table */}
          <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
            <Table aria-label="customized table" stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Benefits
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Effective Date
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Cost
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}></TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {array.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">{row.benifits}</TableCell>
                    <TableCell align="center">
                      <RenderStatus data={row.status} />
                    </TableCell>
                    <TableCell align="center">{row.effectiveDate}</TableCell>
                    <TableCell align="center">$ {row.cost}</TableCell>
                    <TableCell align="center">
                      <Button
                        style={{ color: "white", borderColor: "#7F56D9" }}
                        variant="contained"
                        sx={{
                          backgroundColor: "#7B964A ",
                          "&:hover": {
                            backgroundColor: "#7B964A",
                          },
                        }}
                        onClick={() => {
                          setDialogeOpen(true);
                          setDialogeData(row);
                        }}>
                        Update
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {/* Dialog */}
          {dialogeOpen && (
            <PopUp open={dialogeOpen} data={dialogeData} onClose={onCloseDialoge} />
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  FormLabel,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import pdf from "../../assets/images/pdf-icon.png";
import avtar from "../../assets/images/Avatar.png";

export const PendingApproval = ({ data }) => {
  const [selected, setSelected] = React.useState([]);
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
  return (
    <div className="grid grid-flow-col">
      <div className="grid grid-flow-row">
        {/* table */}
        <div className="mt-3  border border-app-border rounded-md ">
          <Table aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#53783B" }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Timesheet Period
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Hours
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow
                  key={row.id}
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isSelected(row.id)} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.from} to {row.tofrom}
                  </TableCell>
                  <TableCell align="center">{row.hour}</TableCell>

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
        </div>
        {/* view documents */}
        <div className="mt-5 p-4">
          <div className="grid grid-flow-row">
            <text>View Documents </text>
            <FormLabel>Download receipt for January 2022.</FormLabel>
          </div>
          <div>
            <div className="grid grid-flow-col justify-between border border-app-simpleBorder rounded-md p-2 m-5">
              <div className="grid grid-flow-col">
                <img src={pdf} alt="pdf logo" />
                <div className="grid grid-flow-row ml-5">
                  <text style={{ color: "#101828" }}>
                    Receipt_January_2022.pdf
                  </text>
                  <text style={{ color: "#475467" }}>200 KB</text>
                </div>
              </div>
              <div>
                <Button
                  variant="outlined"
                  style={{ color: "#344054", borderColor: "#D0D5DD" }}>
                  Download
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#53783B",
                    color: "#ffffff",
                    marginLeft: 15,
                  }}>
                  View
                </Button>
              </div>
            </div>
            <div className="grid grid-flow-col justify-between border border-app-simpleBorder rounded-md p-2 m-5">
              <div className="grid grid-flow-col">
                <img src={pdf} alt="pdf logo" />
                <div className="grid grid-flow-row ml-5">
                  <text style={{ color: "#101828" }}>
                    Receipt_January_2022.pdf
                  </text>
                  <text style={{ color: "#475467" }}>200 KB</text>
                </div>
              </div>
              <div>
                <Button
                  variant="outlined"
                  style={{ color: "#344054", borderColor: "#D0D5DD" }}>
                  Download
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#53783B",
                    color: "#ffffff",
                    marginLeft: 15,
                  }}>
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-flow-row">
          <text className="text-app-green font-bold my-5 text-xl text-center">
            Pending Approval
          </text>
          <div className="grid grid-flow-col border border-app-gray p-2 mx-3 mb-2 rounded-md">
            <div className="grid grid-flow-col justify-start gap-3">
              <img src={avtar} alt="image" />
              <div className="grid grid-flow-row">
                <text>Olivia Rhye</text>
                <text>@olovia</text>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="grid grid-flow-col border border-app-gray p-2 mx-3 mb-2 rounded-md">
            <div className="grid grid-flow-col justify-start gap-3">
              <img src={avtar} alt="image" />
              <div className="grid grid-flow-row">
                <text>Olivia Rhye</text>
                <text>@olovia</text>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="grid grid-flow-col border border-app-gray p-2 mx-3 mb-2 rounded-md">
            <div className="grid grid-flow-col justify-start gap-3">
              <img src={avtar} alt="image" />
              <div className="grid grid-flow-row">
                <text>Olivia Rhye</text>
                <text>@olovia</text>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="justify-center flex mt-10">
            <Button
              variant="contained"
              style={{ color: "#ffffff", background: "#53783B" }}>
              Bulk Approvals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as React from "react";
import {
  Button,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  TableFooter,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { SideNavProfile } from "../widgets/sidenavProfile";
import { Dummy_benefits } from "../utils/dummy";
import { PopUp } from "../common/popup";

export const Benefit = () => {
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [array, setArray] = React.useState(Dummy_benefits);
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const [dialogeData, setDialogeData] = React.useState();

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - array.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    // hide last border
    // "&:last-child td, &:last-child th": {
    //   border: 0,
    // },
  }));

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
    }
  `;

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 1rem;
    min-width: 500px;
    height: 500px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

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
        size="small"
        label={data}
        color={colorCode}
        variant="outlined"
        style={{ backgroundColor: BgColorCode }}
      />
    );
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserBenefits?userId=" +
          user.userId,
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

  const onCloseDialoge = () => {
    setDialogeOpen(false);
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserBenefits?userId=" +
          user.userId,
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
  };

  return (
    <div className="min-h-screen bg-app-lightBlue">
      <div className="flex">
        <SideNavProfile />
        <div className="my-20 w-full">
          <div className="pl-10 py-5">
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
          <div className="px-10">
            <StyledTableContainer
              sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
              <Table stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell
                      align="left"
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
                      style={{
                        fontWeight: "bold",
                        color: "#475467",
                      }}
                    />
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {array.map((row, index) => (
                    <StyledTableRow key={index}>
                      <TableCell align="left">{row?.benefits}</TableCell>
                      <TableCell align="center">
                        <RenderStatus data={row.status} />
                      </TableCell>
                      <TableCell align="center">{row.effectiveDate}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
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
                {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={5}
                      count={array.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter> */}
              </Table>
            </StyledTableContainer>
          </div>
        </div>
        {/* Dialog */}
        {dialogeOpen && (
          <PopUp
            open={dialogeOpen}
            data={dialogeData}
            onClose={onCloseDialoge}
          />
        )}
      </div>
    </div>
  );
};

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page">
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page">
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page">
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page">
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

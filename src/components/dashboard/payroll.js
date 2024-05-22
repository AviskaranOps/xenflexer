import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { SideNavProfile } from "../widgets/sidenavProfile";
import { Dummy_Payroll } from "../utils/dummy";

export const Payroll = () => {
  const location = useLocation();
  const [array, serArray] = React.useState(Dummy_Payroll);

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
    max-height: 500px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

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

          {/* table */}
          <div className="px-10">
            <StyledTableContainer
              sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
              <Table aria-label="customized table" stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "#475467",
                        width: 300,
                      }}>
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
                {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        15,
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

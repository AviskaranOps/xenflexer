import React from "react";
import {
  Button,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { UploadFileOutlined } from "@mui/icons-material";
import pdf from "../../assets/images/pdf-icon.png";
import jpg from "../../assets/images/jpf-icon.png";
import mp4 from "../../assets/images/mp4-icon.png";
import fig from "../../assets/images/fig-icon.png";
import docx from "../../assets/images/docx-icon.png";
import axios from "axios";
import { message } from "antd";

export const Upload_Document = ({ next, back }) => {
  const [resume, setResume] = React.useState();
  const [certificate, setCretificate] = React.useState();
  const [proof, setProf] = React.useState();
  const [tax, setTax] = React.useState();
  const [agreement, setAgreement] = React.useState();
  const [onNext, setOnNext] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnNext(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("certificate", certificate);
    formData.append("proof", proof);
    formData.append("tax", tax);
    formData.append("agreement", agreement);
    formData.append("docs", true);
    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/userDocuments?userId=" +
          user.userId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("data saved successfully");
      })
      .catch((error) => {
        console.error("document save error:", error.message);
      });
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

  const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
      background-color: #f9fafb;
    }
  `;

  const StyledTableContainer = styled(TableContainer)`
    border-radius: 1rem;
    max-width: 700px;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div>
      <form className="mx-20" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Upload Documents
          </text>
        </div>
        {/* table */}
        <div className="justify-center flex mt-3">
          <StyledTableContainer sx={{ borderWidth: 1, borderColor: "#D1D1D1" }}>
            <Table aria-label="customized table" stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "#475467" }}>
                    Document Name
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Upload File
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#475467" }}>
                    Updated Status
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {/* pdf */}
                <StyledTableRow key="pdf">
                  <TableCell component="th" scope="row">
                    <div className="grid grid-flow-col justify-start">
                      <img src={pdf} alt="pdf logo" width={30} />
                      <div className="items-center flex ml-5">
                        <text style={{ color: "#101828" }}>
                          {resume ? resume.name : "Resume"}
                        </text>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component="label"
                      size="small"
                      style={{
                        color: "#53783B",
                        borderColor: "#53783B",
                        backgroundColor: "#E3F9F9",
                      }}
                      variant="outlined"
                      startIcon={<UploadFileOutlined />}>
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ color: "#475467" }}>
                    {resume ? "Uploaded" : "Pending"}
                  </TableCell>
                </StyledTableRow>
                {/* jpg */}
                <StyledTableRow key="jpg">
                  <TableCell component="th" scope="row">
                    <div className="grid grid-flow-col justify-start">
                      <img src={jpg} alt="jpg logo" width={30} />
                      <div className="items-center flex ml-5">
                        <text style={{ color: "#101828" }}>
                          {certificate ? certificate.name : "Certificates"}
                        </text>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component="label"
                      size="small"
                      style={{
                        color: "#53783B",
                        borderColor: "#53783B",
                        backgroundColor: "#E3F9F9",
                      }}
                      variant="outlined"
                      startIcon={<UploadFileOutlined />}>
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setCretificate(e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ color: "#475467" }}>
                    {certificate ? "Uploaded" : "Pending"}
                  </TableCell>
                </StyledTableRow>
                {/* mp4 */}
                <StyledTableRow key="mp4">
                  <TableCell component="th" scope="row">
                    <div className="grid grid-flow-col justify-start">
                      <img src={mp4} alt="mp4 logo" width={30} />
                      <div className="items-center flex ml-5">
                        <text style={{ color: "#101828" }}>
                          {proof ? proof.name : "Proof of Identification"}
                        </text>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component="label"
                      size="small"
                      style={{
                        color: "#53783B",
                        borderColor: "#53783B",
                        backgroundColor: "#E3F9F9",
                      }}
                      variant="outlined"
                      startIcon={<UploadFileOutlined />}>
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setProf(e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ color: "#475467" }}>
                    {proof ? "Uploaded" : "Pending"}
                  </TableCell>
                </StyledTableRow>
                {/* fig */}
                <StyledTableRow key="fig">
                  <TableCell component="th" scope="row">
                    <div className="grid grid-flow-col justify-start">
                      <img src={fig} alt="fig logo" width={30} />
                      <div className="items-center flex ml-5">
                        <text style={{ color: "#101828" }}>
                          {tax ? tax.name : "Tax Document"}
                        </text>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component="label"
                      size="small"
                      style={{
                        color: "#53783B",
                        borderColor: "#53783B",
                        backgroundColor: "#E3F9F9",
                      }}
                      variant="outlined"
                      startIcon={<UploadFileOutlined />}>
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setTax(e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ color: "#475467" }}>
                    {tax ? "Uploaded" : "Pending"}
                  </TableCell>
                </StyledTableRow>
                {/* docx */}
                <StyledTableRow key="docx">
                  <TableCell component="th" scope="row">
                    <div className="grid grid-flow-col justify-start">
                      <img src={docx} alt="docx logo" width={30} />
                      <div className="items-center flex ml-5">
                        <text style={{ color: "#101828" }}>
                          {agreement ? agreement.name : "Agreement"}
                        </text>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component="label"
                      size="small"
                      style={{
                        color: "#53783B",
                        borderColor: "#53783B",
                        backgroundColor: "#E3F9F9",
                      }}
                      variant="outlined"
                      startIcon={<UploadFileOutlined />}>
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setAgreement(e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={{ color: "#475467" }}>
                    {agreement ? "Uploaded" : "Pending"}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
        <div className="mt-5 justify-end flex">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={back}>
            Previous
          </Button>
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            type="submit">
            Save
          </Button>
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            disabled={!onNext}
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={next}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

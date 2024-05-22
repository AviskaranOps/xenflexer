import React from "react";
import { Button, Card, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CancelOutlined, UploadFileOutlined } from "@mui/icons-material";
import axios from "axios";
import { message } from "antd";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import pdf from "../../assets/pdf_half.png";

export const Upload_Document = ({ next, back }) => {
  const [resume, setResume] = React.useState();
  const [certificate, setCretificate] = React.useState();
  const [proof, setProf] = React.useState();
  const [tax, setTax] = React.useState();
  const [agreement, setAgreement] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();
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
        message.success("Data saved successfully");
      })
      .catch((error) => {
        console.error("document save error:", error.message);
      });
  };

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

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    width: 350,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D6D6D6",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#6366F1",
    },
  }));

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        {/* resume */}
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="flex">
            <div>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                style={{
                  color: "#729434",
                  borderColor: "#729434",
                }}
                endIcon={<UploadFileOutlined />}>
                Upload Resume
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </Button>
              <p style={{ fontSize: 11, color: "#000000", marginTop: 3 }}>
                We accept{"  "}
                <span style={{ color: "#729434" }}>
                  .DOC, .DOCX, .RTF, .TXT, .WPS
                </span>
                {"  "}The size limit is{" "}
                <span style={{ color: "#729434" }}>1MB</span>
              </p>
            </div>
            <div className="grid grid-flow-col justify-start items-center gap-5 pl-5">
              <img src={pdf} alt="pdf logo" />
              <div>
                <p style={{ color: "#3F3F3F", fontSize: 12 }}>
                  {resume ? resume.name : "Please upload your Resume"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setResume()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
        </Card>
        {/* certificate */}
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="flex">
            <div>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                style={{
                  color: "#729434",
                  borderColor: "#729434",
                }}
                endIcon={<UploadFileOutlined />}>
                Upload Certificates
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => setCretificate(e.target.files[0])}
                />
              </Button>
              <p style={{ fontSize: 11, color: "#000000", marginTop: 3 }}>
                We accept{"  "}
                <span style={{ color: "#729434" }}>
                  .DOC, .DOCX, .RTF, .TXT, .WPS
                </span>
                {"  "}The size limit is{" "}
                <span style={{ color: "#729434" }}>1MB</span>
              </p>
            </div>
            <div className="grid grid-flow-col justify-start items-center gap-5 pl-5">
              <img src={pdf} alt="pdf logo" />
              <div>
                <p style={{ color: "#3F3F3F", fontSize: 12 }}>
                  {certificate
                    ? certificate.name
                    : "Please upload your Cretificate"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setCretificate()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
        </Card>
        {/* proof */}
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="flex">
            <div>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                style={{
                  color: "#729434",
                  borderColor: "#729434",
                }}
                endIcon={<UploadFileOutlined />}>
                Upload Proof of Identification
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => setProf(e.target.files[0])}
                />
              </Button>
              <p style={{ fontSize: 11, color: "#000000", marginTop: 3 }}>
                We accept{"  "}
                <span style={{ color: "#729434" }}>
                  .DOC, .DOCX, .RTF, .TXT, .WPS
                </span>
                {"  "}The size limit is{" "}
                <span style={{ color: "#729434" }}>1MB</span>
              </p>
            </div>
            <div className="grid grid-flow-col justify-start items-center gap-5 pl-5">
              <img src={pdf} alt="pdf logo" />
              <div>
                <p style={{ color: "#3F3F3F", fontSize: 12 }}>
                  {proof
                    ? proof.name
                    : "Please upload your Proof of Identification"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setProf()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
        </Card>
        {/* Tax Document */}
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="flex">
            <div>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                style={{
                  color: "#729434",
                  borderColor: "#729434",
                }}
                endIcon={<UploadFileOutlined />}>
                Upload Tax Document
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => setTax(e.target.files[0])}
                />
              </Button>
              <p style={{ fontSize: 11, color: "#000000", marginTop: 3 }}>
                We accept{"  "}
                <span style={{ color: "#729434" }}>
                  .DOC, .DOCX, .RTF, .TXT, .WPS
                </span>
                {"  "}The size limit is{" "}
                <span style={{ color: "#729434" }}>1MB</span>
              </p>
            </div>
            <div className="grid grid-flow-col justify-start items-center gap-5 pl-5">
              <img src={pdf} alt="pdf logo" />
              <div>
                <p style={{ color: "#3F3F3F", fontSize: 12 }}>
                  {tax ? tax.name : "Please upload your Tax Document"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setTax()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
        </Card>
        {/* Agreement */}
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="flex">
            <div>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                style={{
                  color: "#729434",
                  borderColor: "#729434",
                }}
                endIcon={<UploadFileOutlined />}>
                Upload Agreement
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => setAgreement(e.target.files[0])}
                />
              </Button>
              <p style={{ fontSize: 11, color: "#000000", marginTop: 3 }}>
                We accept{"  "}
                <span style={{ color: "#729434" }}>
                  .DOC, .DOCX, .RTF, .TXT, .WPS
                </span>
                {"  "}The size limit is{" "}
                <span style={{ color: "#729434" }}>1MB</span>
              </p>
            </div>
            <div className="grid grid-flow-col justify-start items-center gap-5 pl-5">
              <img src={pdf} alt="pdf logo" />
              <div>
                <p style={{ color: "#3F3F3F", fontSize: 12 }}>
                  {agreement ? agreement.name : "Please upload your Agreement"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setAgreement()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
        </Card>
        {/* button */}
        <div className="mt-8 justify-between flex px-5">
          <Button
            style={{ color: "#729434", borderColor: "#729434" }}
            variant="outlined"
            onClick={back}>
            Previous
          </Button>

          <Button
            style={{ color: "white" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#729434",
              "&:hover": {
                backgroundColor: "#729434",
              },
            }}
            type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </>
  );
};

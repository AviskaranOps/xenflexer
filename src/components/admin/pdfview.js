import React from "react";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const PdfView = () => {
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <div className="h-screen w-full">
      <div className="fixed top-10">
        <IconButton onClick={() => navigation("/pendingApproval")}>
          <KeyboardBackspaceOutlined />
        </IconButton>
      </div>
      <iframe
        // src={URL.createObjectURL(location.state)}
        src={require("../../assets/Dummy_Pdf.pdf")}
        title={"Dummy_Pdf"}
        width="100%"
        height="93%"
      />
    </div>
  );
};

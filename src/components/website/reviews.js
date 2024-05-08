import React from "react";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Reviews = () => {
  const navigation = useNavigate();
  return (
    <div className="my-16 grid grid-flow-row text-center justify-center gap-4">
      <text className="text-app-gray900  text-4xl sm:text-6xl font-semibold">
      Join the Revolution with XenFlexer
      </text>
      <text className="text-app-gray text-base sm:text-xl font-medium italic ">
      We're kicking off our journey in the IT industry, spearheading a new era of <br /> 
      freedom, flexibility, and growth for consultants. Ready to redefine your career? <br />
      Even if you're not in IT, we want to hear from you! Let us know your industry,<br /> 
      and join our waiting list. Be the first to experience how XenFlexer can transform <br />
      your work life. Sign up now, and we'll reach out as we expand into your field.<br />
      Don't miss out on being part of this groundbreaking movement.
      </text>
      <div>
        <Button
          variant="contained"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "#4F7A21",
          }}
          onClick={() => navigation("/flexersignup")}>
          Get in touch
        </Button>
      </div>
    </div>
  );
};

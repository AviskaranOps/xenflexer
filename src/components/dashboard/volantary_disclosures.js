import React from "react";
import {
  Button,
  Card,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const Volantary_Disclosures = ({ back, next }) => {
  const [update, setUpdate] = React.useState();
  const [notification, setNotification] = React.useState();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();
    const user = JSON.parse(localStorage.getItem("token"));
    if (update === "yes") setUpdate(true);
    if (notification === "yes") setNotification(true);
    await axios
      .post(
        "http://localhost:8080/xen/userDisclosure?userId=" +
          user.userId,
        { update, notification },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("saved successfully");
        navigation("/user/profile");
      })
      .catch((error) => {
        console.error("volantary save error:", error.message);
      });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <FormLabel sx={{ color: "#000000", fontSize: 18, fontWeight: 500 }}>
            Please select YES if you are okay with receiving updates on new jobs
            being posted?
          </FormLabel>
          <RadioGroup
            row
            name="update"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            sx={{ gap: 10, mt: 1 }}>
            <FormControlLabel
              value="yes"
              control={<Radio color="success" required />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="success" required />}
              label="No"
            />
          </RadioGroup>
        </Card>
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <FormLabel sx={{ color: "#000000", fontSize: 18, fontWeight: 500 }}>
            Please select YES if you are okay with receivingEmail Notification
            for Newsletter?
          </FormLabel>
          <RadioGroup
            row
            name="notification"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            sx={{ gap: 10, mt: 1 }}>
            <FormControlLabel
              value="yes"
              control={<Radio color="success" required />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="success" required />}
              label="No"
            />
          </RadioGroup>
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
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

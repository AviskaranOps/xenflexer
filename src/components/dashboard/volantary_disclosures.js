import React from "react";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

export const Volantary_Disclosures = () => {
  const [update, setUpdate] = React.useState();
  const [notification, setNotification] = React.useState();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    if(update === "yes") setUpdate(true);
    if(notification === "yes") setNotification(true);
    await axios.post(
        "http://localhost:8080/xen/userDisclosure?userId="+user.userId,
        { update, notification },
        {
          headers: {
            "Authorization" : `Bearer ${user.accessToken}`
          },
        }
      ).then(response => {
        message.success("saved successfully");
        navigation('/user/profile');
      }).catch(error => {
        console.error("volantary save error:", error.message);
    })
  };

  return (
    <div>
      <form className="mx-40" onSubmit={handleSubmit}>
        <div>
          <FormLabel>
            Please select YES if you are okay with receiving updates on new jobs
            being posted?
          </FormLabel>
          <RadioGroup
            aria-labelledby="update"
            name="update"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}>
            <FormControlLabel
              value="yes"
              control={<Radio color="success" />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="success" />}
              label="No"
            />
          </RadioGroup>
        </div>
        <div className="mt-8">
          <FormLabel>
            Please select YES if you are okay with receivingEmail Notification
            for Newsletter?
          </FormLabel>
          <RadioGroup
            aria-labelledby="notification"
            name="notification"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}>
            <FormControlLabel
              value="yes"
              control={<Radio color="success" />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="success" />}
              label="No"
            />
          </RadioGroup>
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
            type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

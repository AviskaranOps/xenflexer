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
import { useEffect } from "react";

export const Volantary_Disclosures = () => {
  const [recieveUpdates, setRecieveUpdates] = React.useState("");
  const [notification, setNotification] = React.useState();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/disclosures/",
        { recieveUpdates, notification }
      );

      if (response.status === 200) {
        console.log("volantary save successfully");
      } else {
        console.log("volantary save failed");
      }
    } catch (error) {
      console.error("volantary save error:", error.message);
    }
    navigation("/dashboard");
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
            value={recieveUpdates}
            onChange={(e) => setRecieveUpdates(e.target.value)}>
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

import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { UploadFileOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

export const My_Experience = ({ next }) => {
  const [file, setFile] = React.useState();

  const [experianceData, setExperianceData] = React.useState([
    {
      title: "",
      companyName: "",
      location: "",
      radioValue: false,
      startDate: "",
      endDate: "",
    },
  ]);

  const addEepFields = () => {
    setExperianceData([
      ...experianceData,
      {
        title: "",
        companyName: "",
        location: "",
        radioValue: false,
        startDate: "",
        endDate: "",
      },
    ]);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...experianceData];
    newFormValues[i][e.target.name] = e.target.value;
    setExperianceData(newFormValues);
  };

  let handleRadioChange = (i, e) => {
    let newFormValues = [...experianceData];
    newFormValues[i][e.target.name] = e.target.checked;
    setExperianceData(newFormValues);
  };

  const removeExpFields = (i) => {
    let newFormValues = [...experianceData];
    newFormValues.splice(i, 1);
    setExperianceData(newFormValues);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/experiance/",
        {
          formData,
          experianceData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("user experience save successfully");
      } else {
        console.log("experience save failed");
      }
    } catch (error) {
      console.error("experience save error:", error.message);
    }
  };

  return (
    <div>
      <form className="mx-40" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Resume
          </text>
          <div>
            <text className="text-app-border mr-10">
              {file ? file.name : "Please upload your Resume"}
            </text>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              style={{
                color: "#344054",
                borderColor: "#53783B",
              }}
              startIcon={<UploadFileOutlined />}>
              Upload Resume/CV
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </div>
        </div>
        <div>
          {experianceData.map((element, index) => {
            return (
              <>
                <div className="mt-14 grid grid-flow-col justify-between ">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      Job Title
                    </FormLabel>
                    <TextField
                      name="title"
                      size="small"
                      placeholder="Enter Title"
                      className="w-72"
                      value={element.title}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="grid grid-flow-row gap-2 ">
                    <FormLabel style={{ color: "#344054" }}>
                      Company Name
                    </FormLabel>
                    <TextField
                      name="companyName"
                      size="small"
                      placeholder="Enter Company"
                      className="w-72"
                      value={element.companyName}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-flow-col justify-between ">
                  <div className="grid grid-flow-row gap-2 ">
                    <FormLabel style={{ color: "#344054" }}>
                      Select Period
                    </FormLabel>
                    <div className="grid grid-flow-col gap-2">
                      <TextField
                        name="startDate"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.startDate}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <TextField
                        name="endDate"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.endDate}
                        disabled={element.radioValue ? true : false}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
                    <TextField
                      name="location"
                      size="small"
                      placeholder="Enter Location"
                      className="w-72"
                      value={element.location}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-flow-col justify-between ">
                  <div className="border border-app-gray rounded-md  px-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="radioValue"
                          size="small"
                          checked={element.radioValue}
                          value={element.radioValue}
                          onChange={(e) => handleRadioChange(index, e)}
                          color="success"
                        />
                      }
                      label="This is my Current company"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      style={{ color: "white", borderColor: "#7F56D9" }}
                      variant="contained"
                      sx={{
                        backgroundColor: "#7B964A ",
                        "&:hover": {
                          backgroundColor: "#7B964A",
                        },
                      }}
                      disabled={experianceData.length === 1}
                      onClick={() => removeExpFields(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="mt-8 justify-end flex">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={() => addEepFields()}>
            Add Education
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

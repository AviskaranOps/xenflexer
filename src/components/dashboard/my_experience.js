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
import { useEffect } from "react";

export const My_Experience = ({ next, back }) => {
  const [file, setFile] = React.useState();
  const [onNext, setOnNext] = React.useState(false);
  const [experianceData, setExperianceData] = React.useState([
    {
      job_title: "",
      company_name: "",
      location: "",
      currentCompany: false,
      start_date: "",
      end_date: "",
    },
  ]);

  const addEepFields = () => {
    setExperianceData([
      ...experianceData,
      {
        job_title: "",
        company_name: "",
        location: "",
        currentCompany: false,
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

  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserExperience?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status != 204) {
          const data = response.data;
          const explist = [];
          for (var item of data) {
            const exp = {
              job_title: item.jobTitle,
              company_name: item.companyName,
              location: item.location,
              currentCompany: item.currentCompany,
              startDate: item.startDate,
              endDate: item.endDate,
            };
            explist.push(exp);
          }
          setExperianceData(explist);
        }
        setOnNext(true);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/userExperience?userId=" +
          user.userId,
        experianceData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setOnNext(true);
      })
      .catch((error) => {
        console.error("experience save error:", error.message);
      });
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    setFile(e.target.files[0]);
    formData.append("file", e.target.files[0]);
    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/uploadResume?userId=" +
          user.userId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("experience save error:", error.message);
      });
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
                onChange={(e) => handleResumeUpload(e)}
              />
            </Button>
          </div>
        </div>
        <div className="mt-5 flex justify-start">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Experience
          </text>
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
                      name="job_title"
                      size="small"
                      placeholder="Enter Title"
                      className="w-72"
                      value={element.job_title}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="grid grid-flow-row gap-2 ">
                    <FormLabel style={{ color: "#344054" }}>
                      Company Name
                    </FormLabel>
                    <TextField
                      name="company_name"
                      size="small"
                      placeholder="Enter Company"
                      className="w-72"
                      value={element.company_name}
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
                        required
                        name="start_date"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.start_date}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <TextField
                        required={element.currentCompany ? false : true}
                        name="end_date"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.end_date}
                        disabled={element.currentCompany ? true : false}
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
                          name="currentCompany"
                          size="small"
                          checked={element.currentCompany}
                          value={element.currentCompany}
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
            Add Experience
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

import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Card,
  IconButton,
} from "@mui/material";
import {
  CancelOutlined,
  CreateOutlined,
  DeleteOutline,
  UploadFileOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";
import { message } from "antd";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import pdf from "../../assets/pdf_half.png";

export const My_Experience = ({ next, back }) => {
  const [file, setFile] = React.useState();
  const [experianceData, setExperianceData] = React.useState({
    jobTitle: "",
    companyName: "",
    location: "",
    currentCompany: false,
    startDate: "",
    endDate: "",
  });

  const [allExperiance, setAllExperiance] = React.useState([]);
  const [editableFiled, setEditableFiled] = React.useState();

  const addEepFields = (e) => {
    e.preventDefault();
    setAllExperiance([...allExperiance, experianceData]);
    setExperianceData({
      jobTitle: "",
      companyName: "",
      location: "",
      currentCompany: false,
      startDate: "",
      endDate: "",
    });
  };

  let handleChange = (i, e) => {
    let newFormValues = [...allExperiance];
    newFormValues[i][e.target.name] = e.target.value;
    setAllExperiance(newFormValues);
  };

  let handleRadioChange = (i, e) => {
    let newFormValues = [...allExperiance];
    newFormValues[i][e.target.name] = e.target.checked;
    setAllExperiance(newFormValues);
  };

  const removeExpFields = (i) => {
    let newFormValues = [...allExperiance];
    newFormValues.splice(i, 1);
    setAllExperiance(newFormValues);
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "http://localhost:8080/xen/getUserExperience?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status !== 204) {
          const data = response.data;
          const explist = [];
          for (var item of data) {
            const exp = {
              jobTitle: item.jobTitle,
              companyName: item.companyName,
              location: item.location,
              currentCompany: item.currentCompany,
              startDate: item.startDate,
              endDate: item.endDate,
            };
            setAllExperiance([...allExperiance, exp]);
            explist.push(exp);
          }
          //setExperianceData(explist);
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();
    const user = JSON.parse(localStorage.getItem("token"));
    await axios
      .post(
        "http://localhost:8080/xen/userExperience?userId=" +
          user.userId,
        allExperiance,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        message.success("Data saved successfully");
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
        "http://localhost:8080/xen/uploadResume?userId=" +
          user.userId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Data saved successfully");
      })
      .catch((error) => {
        console.error("experience save error:", error.message);
      });
  };

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
      <form onSubmit={addEepFields} className="w-full">
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
                  onChange={(e) => handleResumeUpload(e)}
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
                  {file ? file.name : "Please upload your Resume"}
                </p>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton onClick={() => setFile()}>
                <CancelOutlined color="error" />
              </IconButton>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>Job Title</FormLabel>
              <TextField
                name="jobTitle"
                size="small"
                placeholder="Enter Title"
                className="w-72"
                value={experianceData.jobTitle}
                onChange={(e) =>
                  setExperianceData({
                    ...experianceData,
                    jobTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>Company Name</FormLabel>
              <TextField
                name="companyName"
                size="small"
                placeholder="Enter Company"
                className="w-72"
                value={experianceData.companyName}
                onChange={(e) =>
                  setExperianceData({
                    ...experianceData,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
              <TextField
                name="location"
                size="small"
                placeholder="Enter Location"
                className="w-72"
                value={experianceData.location}
                onChange={(e) =>
                  setExperianceData({
                    ...experianceData,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-flow-col gap-2">
              <div className="grid grid-flow-row gap-2">
                <FormLabel style={{ color: "#344054" }}>From Date</FormLabel>
                <TextField
                  required
                  name="start_date"
                  size="small"
                  className="w-36"
                  type="date"
                  value={experianceData.startDate}
                  onChange={(e) =>
                    setExperianceData({
                      ...experianceData,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-flow-row gap-2">
                <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
                <TextField
                  required={experianceData.currentCompany ? false : true}
                  name="end_date"
                  size="small"
                  className="w-36"
                  type="date"
                  value={experianceData.endDate}
                  disabled={experianceData.currentCompany ? true : false}
                  onChange={(e) =>
                    setExperianceData({
                      ...experianceData,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-8 grid grid-flow-col w-fit h-fit">
              <div className="border border-app-gray rounded-md  px-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="currentCompany"
                      size="small"
                      checked={experianceData.currentCompany}
                      value={experianceData.currentCompany}
                      onChange={(e) =>
                        setExperianceData({
                          ...experianceData,
                          currentCompany: e.target.checked,
                        })
                      }
                      color="success"
                    />
                  }
                  label="Current company"
                />
              </div>
            </div>
            <div className="mt-8 w-72 h-fit flex  justify-end">
              <Button
                style={{ color: "white" }}
                variant="contained"
                sx={{
                  backgroundColor: "#7B964A",
                  "&:hover": {
                    backgroundColor: "#7B964A",
                  },
                }}
                type="submit">
                Add
              </Button>
            </div>
          </div>
        </Card>
      </form>
      {/* all experiance list */}
      {allExperiance.map((value, index) => {
        return (
          <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
            <div className="flex justify-between pr-5">
              <text
                style={{
                  color: "#729434",
                  fontWeight: "bold",
                  fontSize: 28,
                }}>
                Experience {index + 1}
              </text>
              <div className="grid grid-flow-col gap-4">
                <IconButton
                  onClick={() => {
                    if (editableFiled === index) {
                      setEditableFiled();
                    } else {
                      setEditableFiled(index);
                    }
                  }}>
                  <CreateOutlined color="primary" />
                </IconButton>
                <IconButton onClick={() => removeExpFields(index)}>
                  <DeleteOutline color="error" />
                </IconButton>
              </div>
            </div>
            {editableFiled === index ? (
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="grid grid-flow-row gap-2">
                  <FormLabel style={{ color: "#344054" }}>Job Title</FormLabel>
                  <TextField
                    name="job_title"
                    size="small"
                    placeholder="Enter Title"
                    className="w-72"
                    value={value.jobTitle}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="grid grid-flow-row gap-2">
                  <FormLabel style={{ color: "#344054" }}>
                    Company Name
                  </FormLabel>
                  <TextField
                    name="company_name"
                    size="small"
                    placeholder="Enter Company"
                    className="w-72"
                    value={value.companyName}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="grid grid-flow-row gap-2">
                  <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
                  <TextField
                    name="location"
                    size="small"
                    placeholder="Enter Location"
                    className="w-72"
                    value={value.location}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="grid grid-flow-col gap-2">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      From Date
                    </FormLabel>
                    <TextField
                      required
                      name="start_date"
                      size="small"
                      className="w-36"
                      type="date"
                      value={value.startDate}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
                    <TextField
                      required={value.currentCompany ? false : true}
                      name="end_date"
                      size="small"
                      className="w-36"
                      type="date"
                      value={value.endDate}
                      disabled={value.currentCompany ? true : false}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>
                <div className="mt-8 grid grid-flow-col w-fit h-fit">
                  <div className="border border-app-gray rounded-md  px-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="currentCompany"
                          size="small"
                          checked={value.currentCompany}
                          value={value.currentCompany}
                          onChange={(e) => handleRadioChange(index, e)}
                          color="success"
                        />
                      }
                      label="Current company"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 mt-5">
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>Job Title:</p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.jobTitle}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>
                    Company Name:
                  </p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.companyName}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>Location:</p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.location}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>Period:</p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.startDate}
                    {" to "}
                    {value.currentCompany === true ? "Present" : value.endDate}
                  </p>
                </div>
              </div>
            )}
          </Card>
        );
      })}
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
          onClick={handleSubmit}>
          Save & Continue
        </Button>
      </div>
    </>
  );
};

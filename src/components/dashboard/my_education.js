import React from "react";
import {
  Button,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Card,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import { CreateOutlined, DeleteOutline } from "@mui/icons-material";

export const My_Education = ({ next, back }) => {
  const [educationData, setEducationData] = React.useState({
    school: "",
    graduation: "",
    field: "",
    startDate: "",
    endDate: "",
    currentPursuing: false,
  });
  const [allEducation, setAllEducation] = React.useState([]);
  const [editableFiled, setEditableFiled] = React.useState();
  const [graduationList, setGraduationList] = React.useState([]);
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const addEduFields = (e) => {
    e.preventDefault();
    setAllEducation([...allEducation, educationData]);
    setEducationData({
      school: "",
      graduation: "",
      field: "",
      startDate: "",
      endDate: "",
      currentPursuing: false,
    });
  };

  let handleChange = (i, e) => {
    let newFormValues = [...allEducation];
    newFormValues[i][e.target.name] = e.target.value;
    setAllEducation(newFormValues);
  };

  let handleRadioChange = (i, e) => {
    let newFormValues = [...allEducation];
    newFormValues[i][e.target.name] = e.target.checked;
    setAllEducation(newFormValues);
  };

  const removeEduFields = (i) => {
    let newFormValues = [...allEducation];
    newFormValues.splice(i, 1);
    setAllEducation(newFormValues);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserEducation?userId=" +
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
              school: item.school,
              graduation: item.graduation,
              field: item.field,
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
            };
            explist.push(exp);
          }
          setEducationData(explist);
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getGraduationList",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        setGraduationList(response.data);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(allEducation);
    await axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/userEducation?userId=" +
          user.userId,
        allEducation,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("Data saved successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("experience save error:", error.message);
      });
  };

  return (
    <>
      <form onSubmit={addEduFields} className="w-full">
        <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>
                School/University
              </FormLabel>
              <TextField
                name="school"
                size="small"
                placeholder="Enter School/University"
                className="w-72"
                value={educationData.school}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    school: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-flow-row gap-2 ">
              <FormLabel style={{ color: "#344054" }}>Graduation </FormLabel>
              <Select
                size="small"
                name="graduation"
                displayEmpty
                value={educationData.graduation}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    graduation: e.target.value,
                  })
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <text style={{ color: "#667085" }}>
                        Select Graduation
                      </text>
                    );
                  }
                  return selected;
                }}
                className="w-72">
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-flow-row gap-2">
              <FormLabel style={{ color: "#344054" }}>Field of Study</FormLabel>
              <TextField
                name="field"
                size="small"
                placeholder="Enter Field of Study"
                className="w-72"
                value={educationData.field}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    field: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-flow-col gap-2 ">
              <div className="grid grid-flow-row gap-2">
                <FormLabel style={{ color: "#344054" }}>From Date</FormLabel>
                <TextField
                  required
                  name="startDate"
                  size="small"
                  className="w-36"
                  type="date"
                  value={educationData.startDate}
                  onChange={(e) =>
                    setEducationData({
                      ...educationData,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-flow-row gap-2">
                <FormLabel style={{ color: "#344054" }}>To Date</FormLabel>
                <TextField
                  required={educationData.currentPursuing ? false : true}
                  name="endDate"
                  size="small"
                  className="w-36"
                  type="date"
                  value={educationData.endDate}
                  disabled={educationData.currentPursuing ? true : false}
                  onChange={(e) =>
                    setEducationData({
                      ...educationData,
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
                      name="currentPursuing"
                      size="small"
                      checked={educationData.currentPursuing}
                      value={educationData.currentPursuing}
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          currentPursuing: e.target.checked,
                        })
                      }
                      color="success"
                    />
                  }
                  label="Current Pursuing"
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
                Save
              </Button>
            </div>
          </div>
        </Card>
      </form>
      {/* all experiance list */}
      {allEducation.map((value, index) => {
        return (
          <Card sx={{ borderRadius: 5, p: 3, mt: 2 }}>
            <div className="flex justify-between pr-5">
              <text
                style={{
                  color: "#729434",
                  fontWeight: "bold",
                  fontSize: 28,
                }}>
                Qualification {index + 1}
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
                <IconButton onClick={() => removeEduFields(index)}>
                  <DeleteOutline color="error" />
                </IconButton>
              </div>
            </div>
            {editableFiled === index ? (
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="grid grid-flow-row gap-2">
                  <FormLabel style={{ color: "#344054" }}>
                    School/University
                  </FormLabel>
                  <TextField
                    name="school"
                    size="small"
                    placeholder="Enter School/University"
                    className="w-72"
                    value={value.school}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="grid grid-flow-row gap-2 ">
                  <FormLabel style={{ color: "#344054" }}>Graduation</FormLabel>
                  <Select
                    size="small"
                    name="graduation"
                    displayEmpty
                    value={value.graduation}
                    onChange={(e) => {
                      handleChange(index, e);
                    }}
                    className="w-72">
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="grid grid-flow-row gap-2">
                  <FormLabel style={{ color: "#344054" }}>
                    Field of Study
                  </FormLabel>
                  <TextField
                    name="field"
                    size="small"
                    placeholder="Enter Field of Study"
                    className="w-72"
                    value={value.field}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="grid grid-flow-col gap-2 ">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      From Date
                    </FormLabel>
                    <TextField
                      required
                      name="startDate"
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
                      required={value.currentPursuing ? false : true}
                      name="endDate"
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
                          name="currentPursuing"
                          size="small"
                          checked={value.currentPursuing}
                          value={value.currentPursuing}
                          onChange={(e) => handleRadioChange(index, e)}
                          color="success"
                        />
                      }
                      label="Current Pursuing"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 mt-5">
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>
                    School/University:
                  </p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.school}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>Graduation:</p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.graduation}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>
                    Field of Study:
                  </p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.field}
                  </p>
                </div>
                <div className="grid grid-flow-row">
                  <p style={{ color: "#484848", fontSize: 14 }}>Period:</p>
                  <p style={{ color: "#000000", fontSize: 18 }}>
                    {value.startDate}
                    {" to "}
                    {value.currentPursuing === true ? "Present" : value.endDate}
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
          Continue
        </Button>
      </div>
    </>
  );
};

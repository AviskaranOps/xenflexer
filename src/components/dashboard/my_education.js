import React from "react";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

export const My_Education = ({ next }) => {
  const [educationData, setEducationData] = React.useState([
    { school: "", graduation: "", field: "", startDate: "", endDate: "" },
  ]);

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

  const addEduFields = () => {
    setEducationData([
      ...educationData,
      { school: "", graduation: "", field: "", startDate: "", endDate: "" },
    ]);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...educationData];
    newFormValues[i][e.target.name] = e.target.value;

    setEducationData(newFormValues);
  };

  const removeEduFields = (i) => {
    let newFormValues = [...educationData];
    newFormValues.splice(i, 1);
    setEducationData(newFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(educationData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/experiance/",
        {
          educationData,
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
        <div className="mt-5 flex justify-start">
          <text
            style={{
              color: "#53783B",
              fontWeight: "bold",
              fontSize: 28,
            }}>
            Education
          </text>
        </div>
        <div>
          {educationData.map((element, index) => {
            return (
              <>
                <div className="mt-14 grid grid-flow-col justify-between ">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      School/University
                    </FormLabel>
                    <TextField
                      name="school"
                      size="small"
                      placeholder="Enter School/University"
                      className="w-72"
                      value={element.school}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="grid grid-flow-row gap-2 ">
                    <FormLabel style={{ color: "#344054" }}>
                      Graduation{" "}
                    </FormLabel>
                    <Select
                      size="small"
                      name="graduation"
                      displayEmpty
                      value={element.graduation}
                      onChange={(e) => handleChange(index, e)}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
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
                </div>
                <div className="my-3 grid grid-flow-col justify-between ">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      Field of Study
                    </FormLabel>
                    <TextField
                      name="field"
                      size="small"
                      placeholder="Enter Field of Study"
                      className="w-72"
                      value={element.field}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
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
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="justify-end flex">
                  <Button
                    style={{ color: "white", borderColor: "#7F56D9" }}
                    variant="contained"
                    sx={{
                      backgroundColor: "#7B964A ",
                      "&:hover": {
                        backgroundColor: "#7B964A",
                      },
                    }}
                    disabled={educationData.length === 1}
                    onClick={() => removeEduFields(index)}>
                    Remove
                  </Button>
                </div>
              </>
            );
          })}
        </div>
        <div className="mt-5 justify-end flex">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}
            onClick={() => addEduFields()}>
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

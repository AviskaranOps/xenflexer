import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import avtar from "../../assets/images/Avatar.png";
import { SideNav } from "../widgets/sidenav";

export const Profile = () => {
  const [editProfile, setEditProfile] = React.useState(false);
  const [image, setImage] = React.useState("");

  const [profile, setProfile] = React.useState({
    name: "My name is this",
    email: "abc@123.com",
    phone: "1234567890",
    designation: "Program manager",
    xenspireEmploye: "Yes",
    country: "india",
    state: "telengana",
    wantTobe: "Yes",
  });
  const [password, setPassword] = React.useState({
    curret: "",
    update: "",
    confirm: "",
  });

  const [experianceData, setExperianceData] = React.useState([
    {
      title: "native developer",
      companyName: "xyz name",
      location: "us,canada",
      radioValue: true,
      startDate: "2021-08-15",
      endDate: "",
    },
  ]);

  const [educationData, setEducationData] = React.useState([
    {
      school: "vd ahmedabad",
      graduation: "Ralph Hubbard",
      field: "Information Technology",
      startDate: "2016-08-15",
      endDate: "2020-03-05",
    },
  ]);

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

  const yes_no = ["Yes", "No"];

  return (
    <div>
      <div className="min-h-screen bg-white">
      <SideNav/>
      <div className="ml-72 border-cyan-500 ">
      <div className="px-56 pt-20 grid grid-flow-col  items-center">
        <div className="rounded-full w-40 h-40 bg-app-gray justify-center items-center">
          {image ? (
            <img src={avtar} alt="check" className="w-full h-full" />
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <Button component="label">
                Upload image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/jpeg, image/png,image/jpg"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
            </div>
          )}
        </div>
        <div>
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
            startIcon={<EditOutlined />}
            onClick={() => setEditProfile(!editProfile)}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* profile */}
      <div className="px-56 py-16 grid grid-cols-2 gap-x-6">
        <div className="pt-5 grid grid-flow-col ">
          <label>Name</label>
          <TextField
            size="small"
            placeholder="Enter your Name"
            value={profile.name}
            disabled={editProfile}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Email</label>
          <TextField
            type="email"
            size="small"
            placeholder="Enter your Email"
            value={profile.email}
            disabled={editProfile}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Phone</label>
          <TextField
            type="tel"
            size="small"
            placeholder="Enter your Phone NO."
            value={profile.phone}
            disabled={editProfile}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Country</label>
          <TextField
            size="small"
            placeholder="your Country"
            value={profile.country}
            disabled={editProfile}
            onChange={(e) =>
              setProfile({ ...profile, country: e.target.value })
            }
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>designation</label>
          <TextField
            size="small"
            placeholder="Enter Status"
            value={profile.designation}
            disabled={editProfile}
            onChange={(e) =>
              setProfile({ ...profile, designation: e.target.value })
            }
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>State</label>
          <TextField
            size="small"
            placeholder="your state"
            value={profile.state}
            disabled={editProfile}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Xenspire Exployee</label>
          <Select
            size="small"
            displayEmpty
            value={profile.xenspireEmploye}
            onChange={(e) =>
              setProfile({ ...profile, xenspireEmploye: e.target.value })
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <text>Yes / No</text>;
              }
              return selected;
            }}>
            {yes_no.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Want to be Xenspire Employee</label>
          <Select
            size="small"
            displayEmpty
            value={profile.wantTobe}
            onChange={(e) =>
              setProfile({ ...profile, wantTobe: e.target.value })
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <text>Yes / No</text>;
              }
              return selected;
            }}>
            {yes_no.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {/* experiance */}
      <div className="px-56 pb-20">
        <text
          style={{
            color: "#53783B",
            fontWeight: "bold",
            fontSize: 28,
          }}>
          Work Experiance
        </text>
        <div>
          {experianceData.map((element, index) => {
            return (
              <>
                <div className="mt-6 grid grid-flow-col justify-between ">
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>
                      Job Title
                    </FormLabel>
                    <TextField
                      name="title"
                      size="small"
                      className="w-72"
                      value={element.title}
                    />
                  </div>
                  <div className="grid grid-flow-row gap-2 ">
                    <FormLabel style={{ color: "#344054" }}>
                      Company Name
                    </FormLabel>
                    <TextField
                      name="companyName"
                      size="small"
                      className="w-72"
                      value={element.companyName}
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
                      />
                      <TextField
                        name="endDate"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.endDate}
                        disabled={element.radioValue ? true : false}
                      />
                    </div>
                  </div>
                  <div className="grid grid-flow-row gap-2">
                    <FormLabel style={{ color: "#344054" }}>Location</FormLabel>
                    <TextField
                      name="location"
                      size="small"
                      className="w-72"
                      value={element.location}
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
                          color="success"
                        />
                      }
                      label="This is my Current company"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* education */}
      <div className="px-56 pb-20">
        <text
          style={{
            color: "#53783B",
            fontWeight: "bold",
            fontSize: 28,
          }}>
          Eduaction
        </text>
        <div>
          {educationData.map((element, index) => {
            return (
              <>
                <div className="mt-6 grid grid-flow-col justify-between ">
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
                      />
                      <TextField
                        name="endDate"
                        size="small"
                        className="w-36"
                        type="date"
                        value={element.endDate}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* update password */}
      <div className="px-56 pb-28">
        <div className="flex justify-end">
          <Button
            style={{ color: "white", borderColor: "#7F56D9" }}
            variant="contained"
            sx={{
              marginLeft: 5,
              backgroundColor: "#7B964A",
              "&:hover": {
                backgroundColor: "#7B964A",
              },
            }}>
            Update Password
          </Button>
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Current Password</label>
          <TextField
            type="password"
            size="small"
            name="current"
            placeholder="Enter Current Password"
            value={password.curret}
            onChange={(e) =>
              setPassword({ ...password, curret: e.target.value })
            }
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Update Password</label>
          <TextField
            type="password"
            size="small"
            name="update"
            placeholder="Enter Update Password"
            value={password.update}
            onChange={(e) =>
              setPassword({ ...password, update: e.target.value })
            }
          />
        </div>
        <div className="pt-5 grid grid-flow-col ">
          <label>Confirm Password</label>
          <TextField
            type="password"
            size="small"
            name="confirm"
            placeholder="Enter Confirm Password"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
          />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

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
import { SideNav } from "../widgets/sidenav";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [editProfile, setEditProfile] = React.useState(true);
  const [image, setImage] = React.useState("");

  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    xenspireEmploye: "",
    country: "",
    state: "",
    wantTobe: "No",
  });
  const [password, setPassword] = React.useState({
    curret: "",
    update: "",
    confirm: "",
  });

  const [experianceData, setExperianceData] = React.useState([
    {
      title: "",
      companyName: "",
      location: "",
      radioValue: true,
      startDate: "",
      endDate: "",
    },
  ]);

  const navigate = useNavigate();

  const [educationData, setEducationData] = React.useState([
    {
      school: "",
      graduation: "",
      field: "",
      startDate: "",
      endDate: "",
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserOnboarded?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.onboarded === false) {
         // navigate('/user/onboard');
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
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/userProfile?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const profile = {
          name: user.username,
          email: user.email,
          phone: data.userInfo?.mobile,
          designation: "",
          xenspireEmploye: data.userInfo?.xenspireIsTheEmployer,
          country: data.userInfo?.country,
          state: "",
          wantTobe: data.userInfo?.doYouWantXenspireToBe,
        };
        setProfile(profile);
        var eduList = [];
        for (var edu of data.education) {
          const education = {
            school: edu.school,
            graduation: edu.graduation,
            field: edu.field,
            startDate: edu?.startDate.substring(0, 11),
            endDate: edu?.endDate.substring(0, 11),
          };
          eduList.push(education);
        }
        setEducationData(eduList);
        var expList = [];
        for (var exp of data.workExperience) {
          const experience = {
            title: exp.jobTitle,
            companyName: exp.companyName,
            location: exp.location,
            radioValue: exp.currentCompany,
            startDate: new Date(exp?.startDate.substring(0, 11)),
            endDate: new Date(exp?.endDate.substring(0, 11)),
          };
          expList.push(experience);
        }
        setExperianceData(expList);
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);

  const yes_no = ["Yes", "No"];

  const update_password = (e) => {
    e.preventDefault();
    if (password.update !== password.confirm) {
      alert("Update and Confirm not same!");
      return;
    }
    const user = JSON.parse(localStorage.getItem("token"));

    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserOnboarded?userId=" +
          user.userId,
        { password },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.onboarded === false) {
          // navigate('/user/onboard');
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const save_profile = () => {
    setEditProfile(true);
    const user = JSON.parse(localStorage.getItem("token"));

    // save profile
    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserOnboarded?userId=" +
          user.userId,
        { profile, image },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.onboarded === false) {
          // navigate('/user/onboard');
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav />
        <div className="w-full">
          <div className="px-56 pt-20 grid grid-flow-col  items-center">
            <div className="rounded-full w-40 h-40 bg-app-gray justify-center items-center">
              {image && editProfile ? (
                <img
                  src={image}
                  alt="check"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <Button component="label">
                    Upload image
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/jpeg, image/png,image/jpg"
                      onChange={onImageChange}
                    />
                  </Button>
                </div>
              )}
            </div>
            <div>
              {editProfile ? (
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
              ) : (
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
                  onClick={save_profile}>
                  Save Profile
                </Button>
              )}
            </div>
          </div>

          {/* profile */}
          <div className="px-56 py-16 grid grid-cols-2 gap-x-6">
            <div className="pt-5 grid grid-cols-2">
              <label>Name</label>
              <TextField
                size="small"
                placeholder="Enter your Name"
                value={profile.name}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div className="pt-5 grid grid-cols-2 ">
              <label>Email</label>
              <TextField
                type="email"
                size="small"
                placeholder="Enter your Email"
                value={profile.email}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="pt-5 grid grid-cols-2 ">
              <label>Phone</label>
              <TextField
                type="tel"
                size="small"
                placeholder="Enter your Phone NO."
                value={profile.phone}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>
            <div className="pt-5 grid grid-cols-2 ">
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
            <div className="pt-5 grid grid-cols-2 ">
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
            <div className="pt-5 grid grid-cols-2 ">
              <label>State</label>
              <TextField
                size="small"
                placeholder="your state"
                value={profile.state}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, state: e.target.value })
                }
              />
            </div>
            <div className="pt-5 grid grid-cols-2 ">
              <label>Xenspire Exployee</label>
              <Select
                size="small"
                displayEmpty
                disabled={editProfile}
                value={profile.xenspireEmploye}
                onChange={(e) =>
                  setProfile({ ...profile, xenspireEmploye: e.target.value })
                }
                renderValue={(selected) => {
                  if (selected?.length === 0) {
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
            <div className="pt-5 grid grid-cols-2 ">
              <label>Want to be Xenspire Employee?</label>
              <Select
                size="small"
                disabled={profile.xenspireEmploye === "Yes" || editProfile}
                displayEmpty
                value={profile.wantTobe}
                onChange={(e) =>
                  setProfile({ ...profile, wantTobe: e.target.value })
                }
                renderValue={(selected) => {
                  if (selected?.length === 0) {
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
                        <FormLabel style={{ color: "#344054" }}>
                          Location
                        </FormLabel>
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
          <form className="px-56 pb-28" onSubmit={update_password}>
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
                }}
                type="submit">
                Update Password
              </Button>
            </div>
            <div className="pt-5 grid grid-flow-col ">
              <label>Current Password</label>
              <TextField
                required
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
                required
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
                required
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
          </form>
        </div>
      </div>
    </div>
  );
};

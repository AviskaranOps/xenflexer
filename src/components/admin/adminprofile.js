import React from "react";
import { Button, TextField } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import avtar from "../../assets/images/Avatar.png";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import { useEffect } from "react";
import axios from "axios";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AdminProfile = () => {
  const [editProfile, setEditProfile] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [profile, setProfile] = React.useState({
    name: "My name is this",
    email: "abc@123.com",
    phone: "1234567890",
    designation: "Program manager",
    status: "admin",
  });
  const [password, setPassword] = React.useState({
    curret: "",
    update: "",
    confirm: "",
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "http://localhost:8080/xen/getAdminProfile?userId=" +
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
          const data = {
            name: response.data.username,
            email: response.data.email,
            phone: "1234567890",
            designation: "Program manager",
            status: response.data.roles[0].name,
          };
          setProfile(data);
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  }, []);


  const update_password = (e) => {
    e.preventDefault();
    if (password.update !== password.confirm) {
      alert("Update and Confirm not same!");
      return;
    }
    const currentPassword = password.curret;
    const newPassword = password.update;
    const user = JSON.parse(localStorage.getItem("token"));

    axios
      .post(
        "http://localhost:8080/xen/updatePassword?userId=" +
          user.userId,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
          message.success("password updated successfully")
          navigate('/logout');
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
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

  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="w-full">
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
          <div className="px-56 py-16">
            <div className="pt-5 grid grid-cols-2 ">
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
              <label>Phone No</label>
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
              <label>Status</label>
              <TextField
                size="small"
                placeholder="Enter Status"
                value={profile.status}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, status: e.target.value })
                }
              />
            </div>
            <div className="pt-5 grid grid-cols-2 ">
              <label>Current Designation</label>
              <TextField
                size="small"
                placeholder="Enter your Designation"
                value={profile.designation}
                disabled={editProfile}
                onChange={(e) =>
                  setProfile({ ...profile, designation: e.target.value })
                }
              />
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
              <label>New Password</label>
              <TextField
                required
                type="password"
                size="small"
                name="update"
                placeholder="Enter New Password"
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

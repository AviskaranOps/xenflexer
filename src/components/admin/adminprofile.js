import React from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SideNavAdmin } from "../widgets/sideNavAdmin";
import { useEffect } from "react";
import axios from "axios";
import { Card, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editProfile, setEditProfile] = React.useState(true);
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

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getAdminProfile?userId=" +
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
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/updatePassword?userId=" +
          user.userId,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        message.success("password updated successfully");
        navigate("/logout");
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
    <div className="min-h-screen bg-app-lightBlue pb-28">
      <div className="flex w-full">
        <SideNavAdmin />
        <div className="w-full mt-24 px-10">
          <div className="mt-1">
            {pathSegments.map((segment, index) => (
              <span
                key={index}
                className={`text-xl font-semibold ${
                  index === 0 ? "text-app-gray" : "text-app-gray900"
                }`}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                {index < pathSegments.length - 1 && " / "}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <Card className="min-w-72 justify-center text-center flex">
              <div className="justify-center items-center flex">
                <img
                  src={image || "https://picsum.photos/200/300.webp"}
                  alt="profile"
                  className="w-48 h-48 rounded-full"
                />
              </div>
              <div className="flex justify-center mt-8">
                <Button component="label" style={{ color: "#669F2A" }}>
                  Upload Picture
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/jpeg, image/png,image/jpg"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Button>
              </div>
            </Card>
            {/* profile */}
            <Card className="w-full">
              <div className="grid grid-cols-2 gap-y-7 gap-x-3">
                <div className="grid grid-flow-row">
                  <p style={{ color: "#57595A" }}>Name</p>
                  <TextField
                    size="small"
                    placeholder="Enter your Name"
                    value={profile.name}
                    disabled={editProfile}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Email</p>
                  <TextField
                    type="email"
                    size="small"
                    placeholder="Enter your Email"
                    value={profile.email}
                    disabled={editProfile}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Phone No</p>
                  <TextField
                    type="tel"
                    size="small"
                    placeholder="Enter your Phone NO."
                    value={profile.phone}
                    disabled={editProfile}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Status</p>
                  <TextField
                    size="small"
                    placeholder="Enter Status"
                    value={profile.status}
                    disabled={editProfile}
                    onChange={(e) =>
                      setProfile({ ...profile, status: e.target.value })
                    }
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Current Designation</p>
                  <TextField
                    size="small"
                    placeholder="Enter your Designation"
                    value={profile.designation}
                    disabled={editProfile}
                    onChange={(e) =>
                      setProfile({ ...profile, designation: e.target.value })
                    }
                    style={{ width: 280 }}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-end my-3">
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#729434",
                width: 149,
              }}>
              Save
            </Button>
          </div>
          {/* update password */}
          <form onSubmit={update_password}>
            <Card>
              <div className="pb-3">
                <p style={{ color: "#729434", fontWeight: 600, fontSize: 20 }}>
                  Password Settings
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Current Password</p>
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
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>New Password</p>
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
                    style={{ width: 280 }}
                  />
                </div>
                <div className="grid grid-flow-row ">
                  <p style={{ color: "#57595A" }}>Confirm Password</p>
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
                    style={{ width: 280 }}
                  />
                </div>
              </div>
            </Card>
            <div className="flex justify-end my-3">
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
          </form>
        </div>
      </div>
    </div>
  );
};

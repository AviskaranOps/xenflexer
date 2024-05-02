import React from "react";
import { Button, TextField } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import avtar from "../../assets/images/Avatar.png";

export const Profile = () => {
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
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-cols-2 ">
          <label>Status</label>
          <TextField
            size="small"
            placeholder="Enter Status"
            value={profile.status}
            disabled={editProfile}
            onChange={(e) => setProfile({ ...profile, status: e.target.value })}
          />
        </div>
        <div className="pt-5 grid grid-cols-2 ">
          <label>Designation</label>
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
        <div className="pt-5 grid grid-cols-2 ">
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
        <div className="pt-5 grid grid-cols-2 ">
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
        <div className="pt-5 grid grid-cols-2 ">
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
  );
};

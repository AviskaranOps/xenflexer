import React from "react";
import { Button, Collapse, IconButton } from "@mui/material";
import {
  EditOutlined,
  KeyboardArrowDownTwoTone,
  KeyboardArrowUpTwoTone,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Divider, message } from "antd";
import { SideNavProfile } from "../widgets/sidenavProfile";

export const New_Profile = () => {
  const location = useLocation();
  const path = location.pathname;
  const [editProfile, setEditProfile] = React.useState(false);
  const [editExperience, setEditExperiance] = React.useState(true);
  const [editEducation, setEditEducation] = React.useState(true);
  const [colapse, setColapse] = React.useState("experience");

  const [image, setImage] = React.useState("");

  const pathSegments = path.split("/").filter((segment) => segment);

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
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserProfileImg?userId=" +
          user.userId,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setImage(
          URL.createObjectURL(new Blob(response.data, { type: "image/png" }))
        );
      })
      .catch((error) => {
        console.log(error.message);
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
            startDate: edu.startDate.substring(0, 11),
            endDate: edu.endDate.substring(0, 11),
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
            startDate: new Date(exp.startDate.substring(0, 11)),
            endDate: new Date(exp.endDate.substring(0, 11)),
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

  const save_Education = () => {
    setEditEducation(true);
    const user = JSON.parse(localStorage.getItem("token"));

    // save Education
    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserOnboarded?userId=" +
          user.userId,
        { educationData },
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

  const save_Experience = () => {
    setEditExperiance(true);
    const user = JSON.parse(localStorage.getItem("token"));

    // save Experience
    axios
      .post(
        "https://xenflexer.northcentralus.cloudapp.azure.com/xen/getUserOnboarded?userId=" +
          user.userId,
        { experianceData },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.onboarded === false) {
          navigate("/user/onboard");
        }
      })
      .catch((error) => {
        console.error("info save error:", error.message);
      });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const user = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("profileImg", event.target.files[0]);
      axios
        .post(
          "https://xenflexer.northcentralus.cloudapp.azure.com/xen/uploadProfileImg?userId=" +
            user.userId,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((response) => {
          setImage(URL.createObjectURL(response.data.profileImg));
        })
        .catch((error) => {});
    }
  };

  let handleEduChange = (i, e) => {
    let newFormValues = [...educationData];
    newFormValues[i][e.target.name] = e.target.value;

    setEducationData(newFormValues);
  };

  let handleExpChange = (i, e) => {
    let newFormValues = [...experianceData];
    newFormValues[i][e.target.name] = e.target.value;
    setExperianceData(newFormValues);
  };

  let handleExpRadioChange = (i, e) => {
    setExperianceData((prev) =>
      prev.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            radioValue: e.target.checked,
          };
        } else {
          return {
            ...item,
            radioValue: false,
          };
        }
      })
    );
  };

  return (
    <div className="min-h-screen bg-app-lightBlue pb-28 ">
      <div className="flex">
        <SideNavProfile />

        <div className="w-full mt-24 px-10">
          <div>
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
            <Card className="min-w-96 justify-center text-center flex">
              <div className="justify-center items-center flex">
                <img
                  src={image || "https://picsum.photos/200/300.webp"}
                  alt="profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>

              <p className="text-app-gray900 text-xl font-bold">
                Esther Howard
              </p>
              <p className="text-app-table ">UI&UX Designer </p>
              <p className="text-app-table ">andrewsmith@gmail.com</p>
              <p className="text-app-table ">123456798</p>
              <div className="flex justify-center mt-8">
                <Button component="label" style={{ color: "#669F2A" }}>
                  Upload Picture
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/jpeg, image/png,image/jpg"
                    onChange={onImageChange}
                  />
                </Button>
              </div>
            </Card>
            <Card className="w-full">
              <div className="grid grid-flow-col justify-between pb-3">
                <text
                  style={{
                    color: "#729434",
                    fontWeight: "bold",
                    fontSize: 28,
                  }}>
                  Basic Details
                </text>
                <div>
                  <Button
                    style={{ color: "white", borderColor: "#7F56D9" }}
                    variant="contained"
                    size="small"
                    sx={{
                      marginLeft: 5,
                      backgroundColor: "#7B964A",
                      "&:hover": {
                        backgroundColor: "#7B964A",
                      },
                    }}
                    endIcon={<EditOutlined />}
                    onClick={() => {
                      // setEditProfile(false);
                      navigate("/user/onboard");
                    }}>
                    Edit
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 pb-3">
                <div>
                  <p className="text-app-table">CITY</p>
                  <p className="text-app-gray900 text-lg">Haydrabad</p>
                </div>
                <div>
                  <p className="text-app-table">STATE</p>
                  <p className="text-app-gray900 text-lg">TELANAGANA</p>
                </div>
              </div>
              <div className="grid grid-cols-2 pb-3">
                <div>
                  <p className="text-app-table">COUNTRY</p>
                  <p className="text-app-gray900 text-lg">INDIA</p>
                </div>
                <div>
                  <p className="text-app-table">PIN CODE</p>
                  <p className="text-app-gray900 text-lg">500034</p>
                </div>
              </div>
              <div className="grid grid-cols-2 pb-3">
                <div>
                  <p className="text-app-table">XENSPIRE EMPLOYEE</p>
                  <p className="text-app-gray900 text-lg">Yes</p>
                </div>
                <div>
                  <p className="text-app-table">
                    WANT TO BE XENSPIRE EMPLOYEE?
                  </p>
                  <p className="text-app-gray900 text-lg">Yes</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Work Experience */}
          <Card className="w-full mt-4">
            <div className="flex pb-1 items-center">
              <div>
                <IconButton
                  onClick={() => {
                    if (colapse === "experience") {
                      setColapse("");
                    } else {
                      setColapse("experience");
                    }
                  }}>
                  {colapse === "experience" ? (
                    <KeyboardArrowUpTwoTone />
                  ) : (
                    <KeyboardArrowDownTwoTone />
                  )}
                </IconButton>
              </div>

              <div className="flex justify-between w-full items-center">
                <text
                  style={{
                    color: "#729434",
                    fontWeight: "bold",
                    fontSize: 28,
                  }}>
                  Work Experience
                </text>
                <div>
                  <Button
                    style={{ color: "white", borderColor: "#7F56D9" }}
                    variant="contained"
                    size="small"
                    sx={{
                      marginLeft: 5,
                      backgroundColor: "#7B964A",
                      "&:hover": {
                        backgroundColor: "#7B964A",
                      },
                    }}
                    endIcon={<EditOutlined />}
                    onClick={() => {
                      navigate("/user/onboard", { state: 1 });
                    }}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Collapse
              in={colapse === "experience"}
              timeout="auto"
              unmountOnExit
              sx={{ pl: 5 }}>
              {yes_no.map((data, index) => {
                return (
                  <>
                    <div className="grid grid-cols-3 gap-y-3" key={index}>
                      <div>
                        <p className="text-app-table">JOB TITLE</p>
                        <p className="text-app-gray900 text-lg">
                          UI&UX DESIGNER
                        </p>
                      </div>
                      <div>
                        <p className="text-app-table">COMPANY NAME</p>
                        <p className="text-app-gray900 text-lg">XYZ COMPANY</p>
                      </div>
                      <div>
                        <p className="text-app-table">Select Period</p>
                        <p className="text-app-gray900 text-lg">
                          05-07-2023 TO 21-07-2024
                        </p>
                      </div>
                      <div>
                        <p className="text-app-table">LOCATION</p>
                        <p className="text-app-gray900 text-lg">Haydrabad</p>
                      </div>
                    </div>
                    {data.length === index + 1 ? "" : <Divider />}
                  </>
                );
              })}
            </Collapse>
          </Card>

          {/* Education Details */}
          <Card className="w-full mt-4">
            <div className="flex pb-1 items-center">
              <div>
                <IconButton
                  onClick={() => {
                    if (colapse === "education") {
                      setColapse("");
                    } else {
                      setColapse("education");
                    }
                  }}>
                  {colapse === "education" ? (
                    <KeyboardArrowUpTwoTone />
                  ) : (
                    <KeyboardArrowDownTwoTone />
                  )}
                </IconButton>
              </div>
              <div className="flex justify-between w-full items-center">
                <text
                  style={{
                    color: "#729434",
                    fontWeight: "bold",
                    fontSize: 28,
                  }}>
                  Education Details
                </text>
                <div>
                  <Button
                    style={{ color: "white", borderColor: "#7F56D9" }}
                    variant="contained"
                    size="small"
                    sx={{
                      marginLeft: 5,
                      backgroundColor: "#7B964A",
                      "&:hover": {
                        backgroundColor: "#7B964A",
                      },
                    }}
                    endIcon={<EditOutlined />}
                    onClick={() => {
                      navigate("/user/onboard", { state: 2 });
                    }}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Collapse
              in={colapse === "education"}
              timeout="auto"
              unmountOnExit
              sx={{ pl: 5 }}>
              {yes_no.map((data, index) => {
                return (
                  <>
                    <div className="grid grid-cols-3 gap-y-3" key={index}>
                      <div>
                        <p className="text-app-table">SCHOOL/UNIVERSITY</p>
                        <p className="text-app-gray900 text-lg">IIM</p>
                      </div>
                      <div>
                        <p className="text-app-table">Graduation</p>
                        <p className="text-app-gray900 text-lg">
                          MIDDLE SCHOOL
                        </p>
                      </div>
                      <div>
                        <p className="text-app-table">Select Period</p>
                        <p className="text-app-gray900 text-lg">
                          05-07-2023 TO 21-07-2024
                        </p>
                      </div>
                      <div>
                        <p className="text-app-table">Field of Study</p>
                        <p className="text-app-gray900 text-lg">MBA</p>
                      </div>
                    </div>
                    {data.length === index + 1 ? "" : <Divider />}
                  </>
                );
              })}
            </Collapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

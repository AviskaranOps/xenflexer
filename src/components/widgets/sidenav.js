import React from "react";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  LogoutOutlined,
  PeopleAltOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import avtar from "../../assets/images/Avatar.png";
import home from "../../assets/images/home-icon.png";
import logo1 from "../../assets/images/Logo.png";
import logo2 from "../../assets/images/app-logo.png";
import Footer from "./footer";

export const SideNav = ({ setUser, email }) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState([]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const drawerWidth = 250;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginBottom: 10,
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const drawer_Data = [
    { name: "Home", icon: home, path: "/user/onboard" },
    {
      name: "Timesheets",
      svgicon: <PieChartOutlined />,
      path: "/user/timesheet",
    },
  ];

  const drawer_Data_new = [
    { name: "Home", icon: home, path: "/user/onboard" },
    {
      name: "Timesheets",
      svgicon: <PieChartOutlined />,
      path: "/user/timesheet",
    },
    { name: "Profile", svgicon: <PeopleAltOutlined />, path: "/user/profile" },
  ];

  React.useEffect(() => {
    if (open) {
      setData(drawer_Data);
    } else {
      setData(drawer_Data_new);
    }
  }, [open]);

  const handleDrawer = () => {
    setOpen(!open);
  };
  const profile_name = [
    { name: "Documents", path: "/user/onboard" },
    { name: "Benefit", path: "/user/benefit" },
    { name: "Payroll", path: "/user/payroll" },
    { name: "Profile Details", path: "/user/profile" },
  ];

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#ffffff" }}>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="h-full bg-app-LightTeal bg-white">
          <List>
            {/* logo */}
            <ListItem
              sx={{
                justifyContent: open ? "initial" : "center",
                p: 2,
              }}>
              <ListItemIcon
                sx={{
                  justifyContent: "left",
                }}>
                {open ? (
                  <img src={logo2} alt="logo" width={180} />
                ) : (
                  <img src={logo1} alt="logo" width={45} />
                )}
              </ListItemIcon>
            </ListItem>

            {data.map((data, index) => (
              <ListItemButton
                key={index}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  margin: 1,
                  borderRadius: 2,
                  ":hover": { backgroundColor: "#CEEAB0" },
                }}
                onClick={() => navigation(data.path)}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    ml: open && data?.svgicon ? -1 : 0,
                    justifyContent: "center",
                  }}>
                  {data?.svgicon ? (
                    <IconButton
                      sx={{
                        ":hover": {
                          background: "none",
                        },
                      }}>
                      {data?.svgicon}
                    </IconButton>
                  ) : (
                    <img src={data.icon} alt="logo" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={data.name}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "#344054",
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                    ml: open && data?.svgicon ? -1 : 0,
                  }}
                />
              </ListItemButton>
            ))}

            {open && (
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  margin: 1,
                  borderRadius: 2,
                  ":hover": { backgroundColor: "#CEEAB0" },
                }}
                onClick={() => handleChange()}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <PeopleAltOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"Profile"}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "#344054",
                  }}
                />
                <ListItemIcon
                  sx={{
                    justifyContent: "right",
                  }}>
                  {expanded ? (
                    <KeyboardArrowUpOutlined />
                  ) : (
                    <KeyboardArrowDownOutlined />
                  )}
                </ListItemIcon>
              </ListItemButton>
            )}
            {/* open widges */}
            {open &&
              expanded &&
              profile_name.map((data, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    justifyContent: "left",
                    px: 2.5,
                    pl: 10,
                    borderRadius: 2,
                    ":hover": { backgroundColor: "#CEEAB0" },
                  }}
                  onClick={() => navigation(data.path)}>
                  <text style={{ color: "#344054", fontWeight: "500" }}>
                    {data.name}
                  </text>
                </ListItemButton>
              ))}
          </List>
        </div>
        {open && (
          <div className="mx-6 border-t-2 border-app-cycle mb-20">
            <div className="grid grid-flow-col mt-3 justify-between">
              <div className="mr-1">
                <img src={avtar} className="w-10" alt="avtar" />
              </div>
              <div className="grid grid-flow-row ">
                <text style={{ fontSize: 12 }}>
                  {JSON.parse(localStorage.getItem("token")).username}
                </text>
                <text style={{ fontSize: 12 }}>
                  {email
                    ? email
                    : JSON.parse(localStorage.getItem("token")).email}
                </text>
              </div>
              <IconButton onClick={() => navigation("/logout")}>
                <LogoutOutlined color="success" />
              </IconButton>
            </div>
          </div>
        )}
        <Footer />
      </Drawer>
    </>
  );
};

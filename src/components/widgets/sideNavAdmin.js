import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import {
  ChevronRightOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
  PeopleAltOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { AppBar, Button, Fade, Menu, MenuItem, Toolbar } from "@mui/material";
import logo2 from "../../assets/images/app-logo.png";
import Footer from "./footer";
import home from "../../assets/images/home-icon.png";

export const SideNavAdmin = ({ setUser, email }) => {
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const manuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const drawer_Data = [{ name: "Home", icon: home, path: "/admin" }];

  const drawer_Data_new = [
    { name: "Home", icon: home, path: "/admin" },
    { name: "Profile", svgicon: <PeopleAltOutlined />, path: "/admin/profile" },
    {
      name: "Timesheets",
      svgicon: <PieChartOutlined />,
      path: "/admin/approval",
    },
  ];

  React.useEffect(() => {
    if (open) {
      setData(drawer_Data);
    } else {
      setData(drawer_Data_new);
    }
  }, [open]);

  const name = [
    { name: "Apporve", path: "/admin/approval" },
    { name: "Create", path: "/admin/create" },
  ];

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}>
        <div className="flex justify-between items-center">
          <Toolbar>
            <img src={logo2} alt="logo" width={180} />
          </Toolbar>

          <div className="mx-6">
            <div
              className="grid grid-flow-col gap-2 justify-between"
              onClick={handleClick}>
              <div className="mr-1 w-6 rounded-full">
                <img
                  src={"https://picsum.photos/200/300.webp"}
                  className="rounded-full"
                  alt="avtar"
                />
              </div>
              <div className="grid grid-flow-row ">
                <text style={{ fontSize: 12, color: "#000000" }}>
                  {JSON.parse(localStorage.getItem("token")).username}
                </text>
                <text style={{ fontSize: 12, color: "#6C737F" }}>
                  {JSON.parse(localStorage.getItem("token")).role}
                </text>
              </div>
            </div>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={manuOpen}
              onClose={handleClose}
              TransitionComponent={Fade}>
              <MenuItem>
                <div className="grid grid-flow-row">
                  <text style={{ fontSize: 12, color: "#6C737F" }}>
                    {JSON.parse(localStorage.getItem("token")).email}
                  </text>
                  <text style={{ fontSize: 12, color: "#6C737F" }}>
                    {JSON.parse(localStorage.getItem("token")).username}
                  </text>
                </div>
              </MenuItem>
              <MenuItem onClick={() => navigation("/admin/profile")}>
                <ManageAccountsOutlined sx={{ color: "#000000bd", mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={() => navigation("/logout")}>
                <LogoutOutlined sx={{ color: "#000000bd", mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
      <div
        id="navbarIcon"
        className=" justify-center z-10 flex w-8 mt-24 overflow-visible bg-white shadow-xl rounded-full fixed h-8"
        style={{ marginLeft: open ? 233 : 50 }}>
        <IconButton onClick={handleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightOutlined />}
        </IconButton>
      </div>
      <Drawer variant="permanent" open={open} className="z-0">
        <DrawerHeader sx={{ backgroundColor: "#ffffff" }} />

        <div className="h-full bg-white pt-2">
          <List>
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
                  <PieChartOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"TimeSheet"}
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
              name.map((data, index) => (
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
      </Drawer>
      <Footer />
    </>
  );
};

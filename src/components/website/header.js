import React from "react";
import {
  ClearAllOutlined,
  ClearOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import logo from "../../assets/images/lOGO 1.png";
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  const navigate = useNavigate();

  const DRAWER = () => {
    return (
        <div>
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => toggleDrawer(false)}>
          <div className="bg-app-border h-full">
            <div className="px-5">
              <IconButton
                sx={{ color: "white", mt: 3 }}
                onClick={() => toggleDrawer(false)}>
                <ClearOutlined />
              </IconButton>
            </div>
            
            <List className="w-64 sm:w-80">
              <ListItem key='0'>
                    <Button
                      onClick={() => navigate("/")}
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Home' sx={{ color: "#ffffff" }} />
                    </Button>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Partners' sx={{ color: 'grey' }} />
                    </Button>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Resources' sx={{ color: 'grey' }} />
                    </Button>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      onClick={() => navigate("/contactUs")}
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Contactus' sx={{ color: "#ffffff" }} />
                    </Button>
                  </ListItem>
                  <Divider/>
                  <ListItem key='0'>
                    <text className="text-app-gray text-base font-black">Flexer</text>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      onClick={() => navigate("/flexersignup")}
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Register' sx={{ color: "#ffffff" }} />
                    </Button>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      fullWidth
                     // disabled='true'
                      onClick={() => navigate("/login")}
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Login' sx={{ color: 'grey' }} />
                    </Button>
                  </ListItem>
                  <Divider/>
                  <ListItem key='0'>
                    <text className="text-app-gray text-base font-black">Client</text>
                  </ListItem>
                  <ListItem key='0'>
                    <Button
                      onClick={() => navigate("/clientHire")}
                      fullWidth
                      sx={{
                        borderWidth: 1,
                        bgcolor: "#4F7A21",
                        borderRadius: 3,
                      }}>
                      <ListItemText primary='Hire' sx={{ color: "#ffffff" }} />
                    </Button>
                  </ListItem>
            </List> 
            <Divider />
          </div>
        </Drawer>
      </div>
    );
  };
  return (
    <nav className="p-3 grid grid-flow-col items-center gap-5 justify-between lg:justify-around px-12">
      <div>
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>

      <ul className="hidden lg:grid grid-flow-col gap-8 ">
          <li className="text-app-gray font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="text-app-gray font-bold">
            <a href="#partners"  style={{ color : '#DEDDDC'}}>
              Partners <KeyboardArrowDownOutlined />
            </a>
          </li>
          <li className="text-app-gray font-bold">
            <a href="#resources" style={{ color : '#DEDDDC'}}>
              Resources <KeyboardArrowDownOutlined />
            </a>
          </li>
          <li className="text-app-gray font-bold">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        <ul className="hidden lg:grid grid-flow-col  gap-8 ">
          <li className="text-app-gray font-bold">
            <text className="text-app-gray text-base font-black">Flexer</text>
          </li>
          <li className="text-app-gray font-bold">
            <Button
              variant="contained"
              onClick={() => navigate('/flexersignup')}
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#669F2A",
              }}>
              Register
            </Button>
          </li>
          <li className="text-app-gray font-bold">
          <Button
            key="three"
          //  disabled='true'
            sx={{
              color: "#344054",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#D0D5DD",
            }}
            onClick={() => navigate("/login")}
            variant="outlined">
            Login
          </Button>
          </li>
        </ul>

        <div className="hidden grid-flow-col lg:grid gap-4 items-center">
        <ul className="hidden lg:grid grid-flow-col  gap-5 ">
          <li className="text-app-gray font-bold">
          <text className="text-app-gray text-base font-black">Client</text>
          </li>
          <li className="text-app-gray font-bold">
          <Button
            variant="contained"
            onClick={ () => navigate('/clientHire')}
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#669F2A",
            }}>
            Hire
          </Button>
          </li>
        </ul>
        </div>

      <div className="lg:hidden">
        {drawer ? (
          <IconButton
            sx={{ color: "black" }}
            onClick={() => toggleDrawer(false)}>
            <ClearOutlined />
          </IconButton>
        ) : (
          <IconButton
            sx={{ color: "black" }}
            onClick={() => toggleDrawer(true)}>
            <ClearAllOutlined />
          </IconButton>
        )}
        <DRAWER />
      </div>
    </nav>
  );
};

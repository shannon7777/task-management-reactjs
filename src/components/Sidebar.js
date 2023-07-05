import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { tokens } from "../theme";
import { Menu, MenuItem, SubMenu, ProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Assignment,
  Equalizer,
  FormatListBulleted,
  Groups3,
  HelpOutlineOutlined,
  HomeOutlined,
  MenuOutlined,
  PeopleAlt,
  PersonOutline,
  PlaylistAddCheck,
} from "@mui/icons-material";

const Item = ({ title, to, icon }) => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const active = location.pathname === to;

  return (
    <MenuItem active={active} style={{ color: colors.grey[100] }} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem(`user`));
  const userImg = JSON.parse(localStorage.getItem(`userImg`));
  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={collapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setCollapsed((prev) => !prev)}
            icon={collapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="user-img"
                  width="100px"
                  height="100px"
                  src={userImg || placeholderPic}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstName}
                  {user.lastName}
                </Typography>

                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item title="Home" to={"/"} icon={<HomeOutlined />} />
            <Item
              title="Personal Tasks"
              to={"/tasks"}
              icon={<FormatListBulleted />}
            />
            <Item
              title="Team Projects"
              to="/team-projects"
              icon={<Groups3 />}
            />
            <SubMenu title="Dashboard" icon={<Equalizer />}>
              <Item
                title="Project Dashboard"
                to={"/project-dashboard"}
                icon={<Assignment />}
              />
              <Item
                title="Members Dashboard"
                to={"/members-dashboard"}
                icon={<PeopleAlt />}
              />
              <Item
                title="Personal Tasks Dashboard"
                to={"/task-dashboard"}
                icon={<PlaylistAddCheck />}
              />
            </SubMenu>
            <Item
              title="User Profile"
              to={"/profile"}
              icon={<PersonOutline />}
            />
            <Item title="About" to={"/about"} icon={<HelpOutlineOutlined />} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import {
  LightModeOutlined,
  SearchOutlined,
  PersonOutlined,
  DarkModeOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Topbar = ({ setNotify }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const logout = useLogout();
  const signout = async () => {
    await logout();
    setNotify({ text: "You have signed out" });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        // display="flex"
        // backgroundColor={colors.primary[400]}
        // borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlined />
        </IconButton> */}
        <IconButton component={Link} to="/">
          <HomeOutlined />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton onClick={signout}>
          <LogoutOutlined />
        </IconButton>
        <IconButton component={Link} to="/profile">
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ColorModeContext } from "../theme";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import useColorMode from "../hooks/useColorMode";
import Topbar from "./Topbar";

const Layout = ({ setNotify, notificationMsg, errorMsg, infoMsg }) => {
  const [theme, colorMode] = useColorMode();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {/* <Navbar setNotify={setNotify} /> */}
            {user && <Sidebar />}
            <main className="content">
              {user && <Topbar setNotify={setNotify} />}
              {notificationMsg}
              {errorMsg}
              {infoMsg}
              <Container maxWidth="xl">
                <Outlet />
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default Layout;

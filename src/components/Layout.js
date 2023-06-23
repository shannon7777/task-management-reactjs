import { Outlet } from "react-router-dom";
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
            {user && <Sidebar />}
            <main className="content">
              {notificationMsg}
              {errorMsg}
              {infoMsg}
              {user && <Topbar setNotify={setNotify} />}
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

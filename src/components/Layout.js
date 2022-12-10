import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";

const Layout = ({ setNotify, notificationMsg, errorMsg, infoMsg }) => {
  return (
    <>
      <Navbar setNotify={setNotify} />
      {notificationMsg}
      {errorMsg}
      {infoMsg}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

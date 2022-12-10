import { Link, useMatch, useResolvedPath, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { Button } from "react-bootstrap";
import ProfilePic from "./ProfilePic";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { BsQuestion } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";

const Navbar = ({ setNotify }) => {
  const {
    auth: { user },
  } = useAuth();

  let imageUrl = JSON.parse(localStorage.getItem("userImg"));

  const logout = useLogout();
  const signout = async () => {
    await logout();
    setNotify({ text: "You have signed out" });
  };

  const CustomLink = ({ to, children }) => {
    // comparing the path name and "to" name , if they are equal then set active class on li element
    // const resolvedPath = useResolvedPath(to);
    // const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    // can use either the hooks above or the variables below for same results
    const path = window.location.pathname;
    let isActive = path === to ? "active" : null;
    return (
      <li className={isActive}>
        <Link className="nav-link" to={to}>
          {children}
        </Link>
      </li>
    );
  };

  const navbar = (
    <nav className="navbar sticky-top">
      <Link className="site-title mx-4" to="/">
        Task Tracker
      </Link>
      <ul className="mx-4">
        {user ? (
          <>
            <CustomLink to="/dashboard">
              <MdOutlineDashboard size={20} color="white" />
              Dashboard
            </CustomLink>

            <CustomLink to="/team-projects">
              <RiTeamLine size={20} color="white" />
               Team Projects
            </CustomLink>

            <CustomLink to="/profile">
              <ProfilePic className="profilePicNavbar" imageUrl={imageUrl} />
              {user.firstName}
            </CustomLink>

            <Button
              className="text-white"
              variant="outline-success"
              onClick={signout}
            >
              <BiLogOut size={20} />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <CustomLink to="/login">
              <RiUserLine size={20} />
              Log In
            </CustomLink>
            <CustomLink to="/register">
              <AiOutlineForm size={20} />
              Register
            </CustomLink>
            <CustomLink to="/about">
              <BsQuestion size={20} />
              About
            </CustomLink>
          </>
        )}
      </ul>
    </nav>
  );

  return navbar;

  // --- CAN ALSO MAKE NAVBAR ITEMS USING MAP METHOD ---

  // const navTabsUser = [
  //   {
  //     icon: <ProfilePic className="profilePicNavbar" imageUrl={imageUrl} />,
  //     route: "/profile",
  //     label: `${user && user.firstName}'s Profile`,
  //   },
  //   {
  //     icon: <MdOutlineDashboard size={20} className="mt-2" />,
  //     route: "/dashboard",
  //     label: "Dashboard",
  //   },
  // ];

  // const navTabs = [
  //   {
  //     icon: <RiUserLine className="mt-2" size={20} />,
  //     route: "/login",
  //     label: "Login",
  //   },
  //   {
  //     icon: <AiOutlineForm size={20} />,
  //     route: "/register",
  //     label: "Register",
  //   },
  //   {
  //     icon: <BsQuestion size={20} />,
  //     route: "/about",
  //     label: "About",
  //   },
  // ];

  // const navbarAuth = (
  //   <nav className="navbar sticky-top">
  //     <Link className="site-title mx-4" to="/">
  //       Task Tracker
  //     </Link>
  //     <ul className="mx-4">
  //       {navTabsUser.map((tab, index) => (
  //         <CustomLink key={`navlink-${index}`} to={tab.route}>
  //           {tab.icon}
  //           {tab.label}
  //         </CustomLink>
  //       ))}
  //       <Button variant="success" onClick={signout}>
  //         Sign Out
  //       </Button>
  //     </ul>
  //   </nav>
  // );

  // const navBarNoAuth = (
  //   <nav className="navbar">
  //     <Link className="site-title mx-4" to="/">
  //       Task Tracker
  //     </Link>

  //     <ul className="mx-4">
  //       {navTabs.map((tab, index) => (
  //         <CustomLink key={`navlink-${index}`} to={tab.route}>
  //           {tab.icon}
  //           {tab.label}
  //         </CustomLink>
  //       ))}
  //     </ul>
  //   </nav>
  // );

  // return user ? navbarAuth : navBarNoAuth;
};

export default Navbar;

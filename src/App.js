import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import MissingPage from "./components/MissingPage";
import { UserProfile, EditProfile } from "./pages/UserProfile";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import CustomAlert from "./components/CustomAlert";
import TaskDashboard from "./pages/TaskDashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import MemberDashboard from "./pages/MembersDashboard";
import ProjectList from "./pages/Projectlist";
import ProjectPage from "./pages/ProjectPage";
import About from "./components/About";

import useAuth from "./hooks/useAuth";
import axios from "axios";

const App = () => {
  const {
    auth: { accessToken },
  } = useAuth();

  const [notify, setNotify] = useState({ show: false, text: "" });
  const [error, setError] = useState({ show: false, text: "" });
  const [info, setInfo] = useState({ show: false, text: "" });

  axios.defaults.baseURL = `http://localhost:5000/api`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = {
    Authorization: `Bearer ${accessToken}`,
    credentials: "include",
  };

  const setNotifications = {
    setError,
    setNotify,
    setInfo,
  };

  const notificationMsg = (
    <CustomAlert
      bg="success"
      show={notify.show}
      text={notify.text}
      onClose={() => setNotify({ show: false })}
    />
  );

  const infoMsg = (
    <CustomAlert
      bg="secondary"
      show={info.show}
      text={info.text}
      onClose={() => setInfo({ show: false })}
    />
  );

  const errorMsg = (
    <CustomAlert
      bg="danger"
      show={error.show}
      text={error.text}
      onClose={() => setError({ show: false })}
    />
  );

  const notifications = {
    notificationMsg,
    infoMsg,
    errorMsg,
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout {...notifications} setNotify={setNotify} />}
        >
          {/* ALL PUBLIC ROUTES */}
          <Route
            path="/register"
            element={<Register {...setNotifications} />}
          />
          <Route
            path="/login"
            element={<Login {...{ setNotify, setError }} />}
          />

          {/* PROTECTED ROUTES THAT NEED AUTHENTICATION */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route
                path="/"
                element={<Home setNotifications={setNotifications} />}
              />
            </Route>

            <Route path="profile" element={<RequireAuth />}>
              <Route index element={<UserProfile {...setNotifications} />} />
              <Route
                path="edit"
                element={<EditProfile {...setNotifications} />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="task-dashboard" element={<TaskDashboard />} />
              {/* <Route path="/project-dashboard" element={<ProjectDashboard />} /> */}
            </Route>

            <Route path="project-dashboard" element={<RequireAuth />}>
              <Route index element={<ProjectDashboard />} />
              <Route path=":project_id" element={<ProjectDashboard />} />
            </Route>

            <Route path="members-dashboard" element={<RequireAuth />}>
              <Route index element={<MemberDashboard />} />
              <Route path=":project_id" element={<MemberDashboard />} />
            </Route>

            <Route path="team-projects" element={<RequireAuth />}>
              <Route index element={<ProjectList {...setNotifications} />} />
              <Route
                path=":project_id"
                element={<ProjectPage {...setNotifications} />}
              />
            </Route>

            <Route path="*" element={<MissingPage />} />
          </Route>

          <Route path="/about" element={<About />} />
          {/* catch all other url routes */}
        </Route>
      </Routes>
    </>
  );
};

export default App;

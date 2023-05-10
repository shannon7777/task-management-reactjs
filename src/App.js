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
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/Projectlist";
import ProjectPage from "./pages/ProjectPage";
import About from "./components/About";

import useAuth from "./hooks/useAuth";
import axios from "axios";
import {
  fetchAllTasks,
  createTask,
  removeTask,
  updateTask,
} from "./services/task";

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
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* <Route element={<RequireAuth />}>
                <Route path="/projectItem" element={}/>
            </Route> */}

            <Route path="team-projects" element={<RequireAuth />}>
              <Route index element={<ProjectList {...setNotifications} />} />
              <Route
                path=":project_id"
                element={<ProjectPage {...setNotifications} />}
              />
            </Route>
          </Route>

          <Route path="/about" element={<About />} />
          {/* catch all other url routes */}
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

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

const App = () => {
  const {
    auth,
    auth: { user, accessToken },
  } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [notify, setNotify] = useState({ show: false, text: "" });
  const [error, setError] = useState({ show: false, text: "" });
  const [info, setInfo] = useState({ show: false, text: "" });
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    progress: "",
    user_id: "",
  });
  const [dateToComplete, setDateToComplete] = useState(null);

  axios.defaults.baseURL = `http://localhost:5000/api`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = {
    Authorization: `Bearer ${accessToken}`,
    credentials: "include",
  };

  useEffect(() => {
    if (user) fetchAllTasks();
  }, [auth]);

  const fetchAllTasks = async () => {
    try {
      const {
        status,
        data: { tasks },
      } = await axios(`/tasks/${user._id}`);
      if (status === 200) setTasks(tasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();
    const task = {
      ...formData,
      dateToComplete: dateToComplete
        ? dateToComplete.toDateString()
        : `No completion date has been set`,
    };
    if (!formData.text)
      throw setInfo({
        text: `Fill in the task form in order to add a task`,
      });
    try {
      const {
        data: { newTask, message },
      } = await axios.post("/tasks", task);
      setTasks([...tasks, newTask]);
      setNotify({ text: message });
      setFormData({ text: "", description: "", progress: "" });
    } catch (error) {
      setError({ text: error.response.data.message });
    }
  };

  // Deleting a task
  const deleteTask = async (id) => {
    try {
      const {
        data: { message },
        status,
      } = await axios.delete(`tasks/${id}`);
      if (status === 401) throw setError({ text: message });
      setNotify({ text: message });
      return setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError({ text: error.message });
    }
  };

  // Editing a specific task and/or a date
  const editTask = async (id, editedTask) => {
    console.log(editedTask);
    try {
      const {
        status,
        data: { updatedTask, message },
      } = await axios.put(`/tasks/${id}`, editedTask);
      if (status === 400) throw setError({ text: message });
      setNotify({ text: message });
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: user._id,
    });
  };

  // Toggling add task form
  const onAdd = () => {
    setShowAddTask(!showAddTask);
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

  const setNotifications = {
    setError,
    setNotify,
    setInfo,
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
                element={
                  <Home
                    onAdd={onAdd}
                    showAddTask={showAddTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    tasks={tasks}
                    fetchAllTasks={fetchAllTasks}
                    formData={formData}
                    setFormData={setFormData}
                    dateToComplete={dateToComplete}
                    setDateToComplete={setDateToComplete}
                    onChange={onChange}
                  />
                }
              />
            </Route>
            <Route path="profile" element={<RequireAuth />}>
              <Route index element={<UserProfile {...setNotifications} />} />
              <Route
                path="edit"
                element={<EditProfile {...setNotifications} />}
              />
            </Route>

            {/* <Route element={<RequireAuth />}> */}
            <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
            {/* </Route> */}

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

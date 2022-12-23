import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import MissingPage from "./components/MissingPage";
import UserProfile from "./components/UserProfile";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import EditProfile from "./components/EditProfile";
import CustomAlert from "./components/CustomAlert";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import About from "./pages/About";

import useAuth from "./hooks/useAuth";
import useFetchImg from "./hooks/useFetchImg";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [notify, setNotify] = useState({ show: false, text: "" });
  const [error, setError] = useState({ show: false, text: "" });
  const [info, setInfo] = useState({ show: false, text: "" });

  const {
    auth,
    auth: { user, accessToken },
  } = useAuth();

  const bearerToken = `Bearer ${accessToken}`;
  const fetchImg = useFetchImg();

  const fetchAllTasks = async () => {
    const result = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: bearerToken },
      credentials: "include",
    });
    const { tasks } = await result.json();
    setTasks(prev => tasks);
  };

  useEffect(() => {
    if (user) {
      fetchAllTasks();
      fetchImg();
    }
  }, [auth]);

  // Add Task
  const addTask = async (task) => {
    if (!task.text) {
      return setError({
        text: `Fill in the task form in order to add a task`,
      });
    }
    console.log(task);
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: bearerToken,
        },
        credentials: "include",
        body: JSON.stringify(task),
      });

      const { newTask, message } = await res.json();
      // maybe i don't need the two lines above ???? please check !! ---
      setTasks([...tasks, newTask]);
      if (res.status === 200) {
        setNotify({ text: message });
      } else if (res.status === 400) {
        throw Error(message);
      }
    } catch (error) {
      setError({ text: error.message });
    }
  };

  // Deleting a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Editing a specific task and/or a date
  const editTask = async (id, editedObj) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify(editedObj),
      });

      const {
        message,
        updatedTask: { text, description, dateToComplete, progress },
      } = await res.json();

      if (res.status === 401) throw Error({ text: message });
      setNotify({ text: `Task has been edited` });
      setTasks(
        tasks.map((task) => {
          if (task._id === id) {
            task.text = text ? text : task.text;
            task.description = description ? description : task.description;
            task.dateToComplete = dateToComplete
              ? dateToComplete
              : task.dateToComplete;
            task.progress = progress ? progress : task.progress;
          }
          return task;
        })
      );
    } catch (error) {
      setError(error.message);
    }
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
            element={<Login setNotify={setNotify} setError={setError} />}
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
                  />
                }
              />
            </Route>
            <Route element={<RequireAuth />}>
              <Route
                path="/profile"
                element={<UserProfile {...setNotifications} />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route
                path="/profile/edit"
                element={<EditProfile {...setNotifications} />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} /> 
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/team-projects" element={<ProjectList />} />
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

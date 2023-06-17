import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  fetchAllTasks,
  createTask,
  updateTask,
  removeTask,
} from "../../services/task";
import useAuth from "../../hooks/useAuth";

import Header from "./Header";
import AddTask from "./AddTask";
import Task from "./Task";
import useFetchImg from "../../hooks/useFetchImg";
import { Chip } from "@mui/material";

const Home = ({ setNotifications }) => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    progress: "",
    user_id: "",
  });
  const [dateToComplete, setDateToComplete] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState(false);
  const {
    auth,
    auth: { user },
  } = useAuth();
  // const user = JSON.parse(localStorage.getItem("user"));
  const fetchImg = useFetchImg();

  useEffect(() => {
    getTasks();
    if (localStorage.getItem("userImg")) return;
    fetchImg();
  }, [auth]);

  const getTasks = () => {
    fetchAllTasks(user._id, setTasks);
  };

  const addTask = async (e) => {
    e.preventDefault();
    createTask(taskProps, setNotifications);
  };

  const editTask = async (id, editedTask) => {
    updateTask(id, editedTask, taskProps, { ...setNotifications });
  };

  const deleteTask = async (id) => {
    removeTask(id, taskProps, { ...setNotifications });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: user._id,
    });
  };

  const onAdd = () => {
    setShowAddTask(!showAddTask);
  };
  // -------------------- TASKS CATEGORIZED BY PROGRESS -----------------

  const taskProps = {
    setTasks,
    deleteTask,
    editTask,
    taskProgressColors,
    formData,
    setFormData,
    onChange,
    dateToComplete,
  };

  // getting each progress by creating a Set to only have unique items
  const uniqueProgress = [...new Set(tasks?.map(({ progress }) => progress))];

  const allTasks = uniqueProgress?.map((progress) => (
    <Col md={6} className="my-3" key={`progress-${progress}`}>
      <Chip
        label={progress}
        sx={{
          border: (theme) => `2px solid ${theme.palette.divider}`,
          mb: 1,
          bgcolor: taskProgressColors[progress],
          fontSize: 15,
        }}
      />
      {tasks
        .filter((task) => task.progress === progress)
        .map((task) => (
          <Task key={`task-${task._id}`} task={task} {...taskProps} />
        ))}
    </Col>
  ));

  return (
    <>
      <Header
        onAdd={onAdd}
        showAddTask={showAddTask}
        totalTasks={tasks.length}
      />

      <AddTask
        addTask={addTask}
        showAddTask={showAddTask}
        formData={formData}
        setFormData={setFormData}
        dateToComplete={dateToComplete}
        setDateToComplete={setDateToComplete}
        onChange={onChange}
      />

      {tasks?.length > 0 ? (
        <Row className="my-5">{allTasks}</Row>
      ) : (
        <h3>You have no tasks, please add some</h3>
      )}
    </>
  );
};

export default Home;

export const taskProgressColors = {
  "New Task": "#92a8d1",
  "In progress": "#feb236",
  Stuck: "#c94c4c",
  Completed: "#82b74b",
};

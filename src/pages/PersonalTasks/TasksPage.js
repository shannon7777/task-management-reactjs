import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  createTask,
  updateTask,
  removeTask,
  fetchAllTasks,
} from "../../services/task";
import useAuth from "../../hooks/useAuth";

import Header from "../../components/Header";
import AddTask from "./AddTask";
import Task from "./Task";
import { Button, Chip, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { tokens } from "../../theme";

const TasksPage = ({ tasks, setTasks, setNotifications }) => {
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    progress: "",
    user_id: "",
  });
  const [dateToComplete, setDateToComplete] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState(false);
  const {
    auth: { user },
  } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchAllTasks(user._id, setTasks);
  }, []);

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
      <Header variant="h1" title="Personal Tasks" sx={{ mt: 2 }} />

      <Button
        variant="contained"
        size="large"
        endIcon={<Add />}
        onClick={() => setShowAddTask((prev) => !prev)}
        sx={{ background: colors.greenAccent[600] }}
      >
        Add a Task
      </Button>

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

export default TasksPage;

export const taskProgressColors = {
  "New Task": "#92a8d1",
  "In progress": "#feb236",
  Stuck: "#c94c4c",
  Completed: "#82b74b",
};

import { useEffect } from "react";
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

const Home = ({
  onAdd,
  showAddTask,
  addTask,
  tasks,
  deleteTask,
  editTask,
  dateToComplete,
  setDateToComplete,
  formData,
  setFormData,
  onChange,
}) => {
  // const {
  //   auth,
  //   auth: { user },
  // } = useAuth();

  // useEffect(() => {
  //   if (user) getTasks();
  // }, [auth]);

  // const getTasks = () => {
  //   fetchAllTasks(user._id, setTasks);
  // };

  // const addTask = async (e) => {
  //   e.preventDefault();
  //   createTask(taskProps, setNotifications);
  // };

  // const editTask = async (id, editedTask) => {
  //   updateTask(id, editedTask, taskProps, setNotifications);
  // };

  // const deleteTask = async (id) => {
  //   removeTask(id, taskProps, setNotifications);
  // };
  // -------------------- TASKS CATEGORIZED BY PROGRESS -----------------
  const colorStatus = {
    "New Task": "#92a8d1",
    "In progress": "#feb236",
    Stuck: "#c94c4c",
    Completed: "#82b74b",
  };

  const taskProps = {
    deleteTask,
    editTask,
    colorStatus,
    formData,
    setFormData,
    onChange,
  };

  const fetchImg = useFetchImg();

  useEffect(() => {
    fetchImg();
  }, []);

  // getting each progress by creating a Set to only have unique items
  const uniqueProgress = [...new Set(tasks?.map(({ progress }) => progress))];

  const allTasks = uniqueProgress?.map((progress) => (
    <Col md={6} className="my-3" key={`progress-${progress}`}>
      <span
        className="progress-title"
        style={{ background: colorStatus[progress] }}
      >
        <span>{progress}</span>
      </span>
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

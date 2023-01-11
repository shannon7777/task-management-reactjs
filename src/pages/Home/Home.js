import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import AddTask from "./AddTask";
import useAuth from "../../hooks/useAuth";
import Task from "./Task";

const Home = ({ onAdd, showAddTask, addTask, tasks, deleteTask, editTask }) => {
  const {
    auth: {
      user: { username },
    },
  } = useAuth();

  const [active, setActive] = useState(null);

  // -------------------- TASKS CATEGORIZED BY PROGRESS -----------------

  const uniqueProgress = [...new Set(tasks.map(({ progress }) => progress))];
  console.log(tasks);

  const colorStatus = {
    "New Task": "#92a8d1",
    "In progress": "#feb236",
    Stuck: "#c94c4c",
    Completed: "#82b74b",
  };

  const taskProps = {
    active,
    setActive,
    deleteTask,
    editTask,
    colorStatus,
  };

  const allTasks = uniqueProgress.map((progress, index) => (
    <Col md={6} className="my-3">
      <span
        key={`progress-${index}`}
        className="progress-title"
        style={{ background: colorStatus[progress] }}
      >
        <span>{progress}</span>
      </span>
      {tasks
        .filter((task) => task.progress === progress)
        .map((filteredTask, i) => (
          <Task key={`task-${i}`} task={filteredTask} {...taskProps} />
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

      <AddTask addTask={addTask} showAddTask={showAddTask} />

      {tasks.length > 0 ? (
        <Row className="my-5">{allTasks}</Row>
      ) : (
        <h3>You have no tasks, please add some</h3>
      )}
    </>
  );
};

export default Home;

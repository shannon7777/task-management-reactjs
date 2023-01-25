import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import AddTask from "./AddTask";
import Task from "./Task";

const Home = ({ onAdd, showAddTask, addTask, tasks, deleteTask, editTask }) => {

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
  };

  // getting each progress by creating a Set to only have unique items
  const uniqueProgress = [...new Set(tasks.map(({ progress }) => progress))];

  const allTasks = uniqueProgress.map((progress) => (
    <Col md={6} className="my-3" key={`progress-${progress}`}>
      <span
        className="progress-title"
        style={{ background: colorStatus[progress] }}
      >
        <span>{progress}</span>
      </span>
      {tasks
        .filter((task) => task.progress === progress)
        .map((filteredTask) => (
          <Task key={`task-${filteredTask._id}`} task={filteredTask} {...taskProps} />
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

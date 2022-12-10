import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import AddTask from "./AddTask";
import useAuth from "../hooks/useAuth";
import Task from "./Task";
import PersonalAnalytics from "./PersonalAnalytics";

const Home = ({
  onAdd,
  showAddTask,
  addTask,
  tasks,
  deleteTask,
  editTask,
  fetchAllTasks,
}) => {
  const {
    auth: {
      user: { username },
    },
  } = useAuth();

  const [active, setActive] = useState(null);

  const taskProps = {
    active,
    setActive,
    deleteTask,
    editTask,
  };

  const newTasks = tasks
    .filter((i) => i.progress === "New Task")
    .map((task, index) => <Task key={index} task={task} {...taskProps} />);

  const inProgressTasks = tasks
    .filter((i) => i.progress === "In progress")
    .map((task, index) => <Task key={index} task={task} {...taskProps} />);

  const completedTasks = tasks
    .filter((i) => i.progress === "Completed")
    .map((task, index) => <Task key={index} task={task} {...taskProps} />);

  const stuckTasks = tasks
    .filter((i) => i.progress === "Stuck")
    .map((task, index) => <Task key={index} task={task} {...taskProps} />);

  // const tasksList =
  //   tasks?.length === 0 ? (
  //     <h3>There are no tasks, please add one</h3>
  //   ) : (
  //     <Tasks tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
  //   );

  return (
    <>
      <Header
        onAdd={onAdd}
        showAddTask={showAddTask}
        fetchAllTasks={fetchAllTasks}
        totalTasks={tasks.length}
      />

      <AddTask addTask={addTask} showAddTask={showAddTask} />

      {tasks.length > 0 ? (
        <>
          <Row className="my-5">
            <Col>
              <span
                className="progress-title"
                style={{ background: "#92a8d1" }}
              >
                <span>New Tasks</span>
                <span className="bubble">{newTasks.length}</span>
              </span>
              {newTasks}
            </Col>

            <Col>
              <span
                className="progress-title"
                style={{ background: "#feb236" }}
              >
                <span>In progress</span>
                <span className="bubble">{inProgressTasks.length}</span>
              </span>
              {inProgressTasks}
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <span
                className="progress-title"
                style={{ background: "#c94c4c" }}
              >
                <span>Tasks that need attention</span>
                <span className="bubble">{stuckTasks.length}</span>
              </span>
              {stuckTasks}
            </Col>
            <Col>
              <span
                className="progress-title"
                style={{ background: "#82b74b" }}
              >
                <span>Completed</span>
                <span className="bubble">{completedTasks.length}</span>
              </span>
              {completedTasks}
            </Col>
          </Row>{" "}
        </>
      ) : (
        <h3>You have no tasks, please add some</h3>
      )}
      <PersonalAnalytics
        totalCompleted={completedTasks.length}
        totalNew={newTasks.length}
        totalInProgress={inProgressTasks.length}
        totalStuck={stuckTasks.length}
        totalTasks={tasks.length}
      />
    </>
  );
};

export default Home;

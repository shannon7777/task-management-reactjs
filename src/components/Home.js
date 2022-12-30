import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import Header from "./Header";
import AddTask from "./AddTask";
import useAuth from "../hooks/useAuth";
import Task from "./Task";
import PersonalAnalytics from "./PersonalAnalytics";
import { AiOutlineConsoleSql } from "react-icons/ai";

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

  // -------------------- TASKS CATEGORIZED BY PROGRESS -----------------

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

  // --------- FIRST BAR CHART -------------

  const notCompleted = tasks.filter((task) => task.progress !== "Completed");
  const thisWeekend = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
  );
  const nextWeekend = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 14)
  );
  const twoWeeksFromNow = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 21)
  );
  const threeWeeksFromNow = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 28)
  );

  // --------- TIME RANGE FILTERS FOR ANALYTICS ----------
  const dueThisWeek = notCompleted.filter(
    (task) => new Date(task.dateToComplete) < thisWeekend
  );

  const dueNextWeekend = notCompleted.filter(
    (task) =>
      thisWeekend < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < nextWeekend
  );

  const dueTwoWeeksFromNow = notCompleted.filter(
    (task) =>
      nextWeekend < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < twoWeeksFromNow
  );

  const dueThreeWeeksFromNow = notCompleted.filter(
    (task) =>
      twoWeeksFromNow < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < threeWeeksFromNow
  );

  // -------- SECOND BAR CHART --------

  const thisWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay())
  );

  const lastWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
  );

  const twoWeeksAgoMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 13)
  );

  const completed = tasks.filter((task) => task.progress === "Completed");

  const completedThisWeek = completed.filter(
    (task) => thisWeekMonday < new Date(task.completedDate)
  );

  const completedLastWeek = completed.filter(
    (task) =>
      lastWeekMonday < new Date(task.completedDate) &&
      new Date(task.completedDate) < thisWeekMonday
  );

  const completedTwoWeeksAgo = completed.filter(
    (task) =>
      twoWeeksAgoMonday < new Date(task.completedDate) &&
      new Date(task.completedDate) < lastWeekMonday
  );

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
        dueThisWeek={dueThisWeek}
        dueNextWeekend={dueNextWeekend}
        dueTwoWeeksFromNow={dueTwoWeeksFromNow}
        dueThreeWeeksFromNow={dueThreeWeeksFromNow}
        completedThisWeek={completedThisWeek.length}
        completedLastWeek={completedLastWeek.length}
        completedTwoWeeksAgo={completedTwoWeeksAgo.length}
      />
    </>
  );
};

export default Home;

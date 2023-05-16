import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import BarChartDueTasks from "./BarChartDueTasks";
import BarChartCompletedTasks from "./BarChartCompletedTasks";
import PieChart from "./PieChart";
import ProgressBar from "./ProgressBar";

const TaskDashboard = () => {
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   let allTasks = JSON.parse(localStorage.getItem("tasks"));
  //   setTasks(allTasks);
  // }, []);
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  // ---- PIE CHART DATA -----
  const totalNew = tasks.filter(({ progress }) => progress === "New Task");
  const totalInProgress = tasks.filter(
    ({ progress }) => progress === "In progress"
  );
  const dateToday = new Date().setHours(0, 0, 0, 0);
  const incomplete = tasks.filter(({ progress }) => progress !== "Completed");
  const totalOverdue = incomplete.filter(
    (task) => new Date(task.dateToComplete) < dateToday
  ).length;
  const pending = incomplete.length - totalOverdue;
  const completed = tasks.filter(({ progress }) => progress === "Completed");
  const totalStuck = tasks.filter(({ progress }) => progress === "Stuck");
  const totalDueToday = tasks.filter(
    (task) => task.dateToComplete === new Date().toDateString()
  ).length;

  const pieChartData = [
    { name: "New Tasks", value: totalNew.length },
    { name: "In Progress", value: totalInProgress.length },
    { name: "Stuck", value: totalStuck.length },
    { name: "Completed", value: completed.length },
  ];
  const pieChartColors = ["#92a8d1", "#feb236", "#c94c4c", "#82b74b"];

  const pieChartData2 = [
    { name: "Overdue", value: totalOverdue },
    {
      name: "Due Today",
      value: totalDueToday,
    },
    { name: "Pending", value: pending },
  ];

  const pieChartColors2 = ["#f18973", "#f4e1d2", "#b2b2b2"];

  // ------- TIME RANGES (TASKS DUE VS TASKS) ------

  const thisWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay())
  );
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

  // ---- BAR CHART DATA (TASKS DUE VS TASKS) -----
  const dueThisWeek = incomplete.filter(
    (task) =>
      thisWeekMonday < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < thisWeekend
  );

  const dueNextWeekend = incomplete.filter(
    (task) =>
      thisWeekend < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < nextWeekend
  );

  const dueTwoWeeksFromNow = incomplete.filter(
    (task) =>
      nextWeekend < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < twoWeeksFromNow
  );

  const dueThreeWeeksFromNow = incomplete.filter(
    (task) =>
      twoWeeksFromNow < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < threeWeeksFromNow
  );

  const stuckThisWeek = dueThisWeek.filter((task) => task.progress === "Stuck");

  const stuckNextWeek = dueNextWeekend.filter(
    (task) => task.progress === "Stuck"
  );

  const stuckTwoWeeksFromNow = dueTwoWeeksFromNow.filter(
    (task) => task.progress === "Stuck"
  );

  const stuckThreeWeeksFromNow = dueThreeWeeksFromNow.filter(
    (task) => task.progress === "Stuck"
  );

  const barChartDataTasksDue = [
    {
      name: "This week",
      "amount of tasks due": dueThisWeek.length,
      "Tasks Stuck & Due": stuckThisWeek.length,
    },
    {
      name: "Next week",
      "amount of tasks due": dueNextWeekend.length,
      "Tasks Stuck & Due": stuckNextWeek.length,
    },
    {
      name: "Week after",
      "amount of tasks due": dueTwoWeeksFromNow.length,
      "Tasks Stuck & Due": stuckTwoWeeksFromNow.length,
    },
    {
      name: "3 weeks time",
      "amount of tasks due": dueThreeWeeksFromNow.length,
      "Tasks Stuck & Due": stuckThreeWeeksFromNow.length,
    },
  ];

  // ------- BAR CHART DATA (COMPLETED TASKS) -------

  const lastWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
  );

  const twoWeeksAgoMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 13)
  );

  const completedThisWeek = completed.filter(
    (task) =>
      thisWeekMonday < new Date(task.completedDate) &&
      new Date(task.completedDate) < thisWeekend
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

  const barChartDataCompleted = [
    { name: "This week", "Completed Tasks": completedThisWeek.length },
    { name: "Last week", "Completed Tasks": completedLastWeek.length },
    { name: "2 Weeks ago", "Completed Tasks": completedTwoWeeksAgo.length },
  ];

  const colors = [
    { value: "New Task", color: "#92a8d1" },
    { value: "In progress", color: "#feb236" },
    { value: "Stuck", color: "#c94c4c" },
    { value: "Completed", color: "#82b74b" },
  ];

  const newTaskPercentage = (totalNew.length / tasks.length) * 100;
  const inProgressPercentage = (totalInProgress.length / tasks.length) * 100;
  const stuckPercentage = (totalStuck.length / tasks.length) * 100;
  const completedPercentage = (completed.length / tasks.length) * 100;

  const progressBarDataTest = [
    {
      value: newTaskPercentage,
      color: "#92a8d1",
    },
    {
      value: inProgressPercentage,
      color: "#feb236",
    },
    { value: stuckPercentage, color: "#c94c4c" },
    {
      value: completedPercentage,
      color: "#82b74b",
    },
  ];

  return (
    <Card className="p-3 m-4">
      <Card.Title className="text-uppercase text-center">
        Analytics for Personal Tasks
      </Card.Title>
      <Row>
        <Col>
          <Card.Title className="pl-5">Total tasks: {tasks.length}</Card.Title>
          <Card.Title>Pending : {pending}</Card.Title>
          <Card.Title>Total Due : {incomplete.length}</Card.Title>
          <Card.Title>Tasks overdue: {totalOverdue}</Card.Title>
        </Col>
      </Row>

      <Row>
        {/* PROGRESS BAR */}
        <Col
          className="border border-muted rounded shadow m-3 text-white"
          style={{ backgroundColor: "rgb(27, 29, 66)" }}
        >
          <Col className="m-3">
            {colors.map((i, index) => {
              return (
                <div key={`index-${index}`}>
                  <span
                    className="dot"
                    style={{ backgroundColor: i.color }}
                  ></span>
                  {i.value}
                </div>
              );
            })}
          </Col>
          <ProgressBar progressBarDataTest={progressBarDataTest} />
        </Col>
        {/* PIE CHART */}
        <Col
          className="border border-muted rounded shadow m-3"
          style={{ backgroundColor: "rgb(27, 29, 66)" }}
        >
          <PieChart
            pieChartData={pieChartData}
            pieChartColors={pieChartColors}
            pieChartData2={pieChartData2}
            pieChartColors2={pieChartColors2}
          />
        </Col>
      </Row>

      <Row>
        {/* BAR CHART FOR COMPLETED TASKS */}
        <Col
          className="border border-muted rounded shadow m-3"
          style={{ backgroundColor: "rgb(27, 29, 66)" }}
        >
          <BarChartCompletedTasks
            barChartDataCompleted={barChartDataCompleted}
          />
        </Col>

        {/* BAR CHART FOR DUE TASKS & STUCK TASKS */}
        <Col className="border border-muted rounded shadow m-3">
          <BarChartDueTasks barChartDataTasksDue={barChartDataTasksDue} />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskDashboard;

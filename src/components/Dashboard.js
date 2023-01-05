import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import BarChartDueTasks from "./BarChartDueTasks";
import BarChartCompletedTasks from "./BarChartCompletedTasks";
import PieChart from "./PieChart";

const Dashboard = ({ tasks }) => {
  //  ----- DATA ANALYTICS ----
  // ---- PIE CHART DATA -----
  const totalNew = tasks.filter((task) => task.progress === "New Task");
  const totalInProgress = tasks.filter(
    (task) => task.progress === "In progress"
  );
  const totalCompleted = tasks.filter((task) => task.progress === "Completed");
  const totalStuck = tasks.filter((task) => task.progress === "Stuck");

  const pieChartData = [
    { name: "New Tasks", value: totalNew.length },
    { name: "In Progress", value: totalInProgress.length },
    { name: "Stuck", value: totalStuck.length },
    { name: "Completed", value: totalCompleted.length },
  ];
  const pieChartColors = ["#92a8d1", "#feb236", "#c94c4c", "#82b74b"];

  // ------- TIME RANGES (TASKS DUE VS TASKS) ------
  const notCompleted = tasks.filter((task) => task.progress !== "Completed");

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
  const dueThisWeek = notCompleted.filter(
    (task) =>
      thisWeekMonday < new Date(task.dateToComplete) &&
      new Date(task.dateToComplete) < thisWeekend
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
      "amount of tasks due": stuckThisWeek.length
        ? dueThisWeek.length - stuckThisWeek.length
        : dueThisWeek.length,
      "Stuck Tasks": stuckThisWeek.length,
    },
    {
      name: "Next week",
      "amount of tasks due": stuckNextWeek.length
        ? dueNextWeekend.length - stuckThisWeek.length
        : dueNextWeekend.length,
      "Stuck Tasks": stuckNextWeek.length,
    },
    {
      name: "Week after",
      "amount of tasks due": stuckTwoWeeksFromNow.length
        ? dueTwoWeeksFromNow.length - stuckThisWeek.length
        : dueTwoWeeksFromNow.length,
      "Stuck Tasks": stuckTwoWeeksFromNow.length,
    },
    {
      name: "3 weeks time",
      "amount of tasks due": stuckThreeWeeksFromNow.length
        ? dueThreeWeeksFromNow.length - stuckThisWeek.length
        : dueThreeWeeksFromNow.length,
      "Stuck Tasks": stuckThreeWeeksFromNow.length,
    },
  ];

  // ------- BAR CHART DATA (COMPLETED TASKS) -------

  const lastWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
  );

  const twoWeeksAgoMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 13)
  );

  const completed = tasks.filter((task) => task.progress === "Completed");

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
    { name: "2 Weeks ago", "Completed Tasks": completedTwoWeeksAgo.length },
    { name: "Last week", "Completed Tasks": completedLastWeek.length },
    { name: "This week", "Completed Tasks": completedThisWeek.length },
  ];

  return (
    <Card className="p-3 m-4 bg-white">
      <Card.Title className="text-uppercase text-center">
        Analytics for Personal Tasks
      </Card.Title>
      <Card.Title className="pl-5">Total tasks: {tasks.length}</Card.Title>

      <Row>
        {/* PIE CHART */}
        <Col className="border border-muted rounded shadow m-3">
          <PieChart
            pieChartData={pieChartData}
            pieChartColors={pieChartColors}
          />
        </Col>
        {/* BAR CHART FOR DUE TASKS & STUCK TASKS */}
        <Col className="border border-muted rounded shadow m-3">
          <BarChartDueTasks barChartDataTasksDue={barChartDataTasksDue} />
        </Col>
      </Row>

      <Row>
        {/* BAR CHART FOR COMPLETED TASKS */}
        <Col className="border border-muted rounded shadow m-3">
          <BarChartCompletedTasks
            barChartDataCompleted={barChartDataCompleted}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;

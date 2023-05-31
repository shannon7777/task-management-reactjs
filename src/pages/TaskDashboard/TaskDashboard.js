import { Card, Row, Col } from "react-bootstrap";

import BarChartDueTasks from "./BarChartDueTasks";
import BarChartCompletedTasks from "./BarChartCompletedTasks";
import PieChart from "./PieChart";
import ProgressBar from "./ProgressBar";

import { taskProgressColors } from "../Home/Home";

const TaskDashboard = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  let incomplete = tasks.filter((task) => task.progress !== "Completed");
  let totalOverdue = tasks.filter(
    (task) => new Date(task.dateToComplete) < new Date()
  );

  let colors = [];
  for (let c in taskProgressColors) {
    let obj = {};
    obj.value = c;
    obj.color = taskProgressColors[c];
    colors.push(obj);
  }

  let progressBarDataTest = [];
  for (let i in taskProgressColors) {
    let obj = {};
    obj.color = taskProgressColors[i];
    obj.value =
      (tasks.filter((task) => task.progress === i).length / tasks.length) * 100;
    progressBarDataTest.push(obj);
  }

  return (
    <Card className="p-3 m-4">
      <Card.Title className="text-uppercase text-center">
        Analytics for Personal Tasks
      </Card.Title>
      <Row>
        <Col>
          <Card.Title className="pl-5">Total tasks: {tasks.length}</Card.Title>
          {/* <Card.Title>Pending : {pending}</Card.Title> */}
          <Card.Title>Total Due : {incomplete.length}</Card.Title>
          <Card.Title>Tasks overdue: {totalOverdue.length}</Card.Title>
        </Col>
      </Row>

      <Row>
        {/* PROGRESS BAR */}
        <Col className="border rounded shadow">
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
        <Col>
          <PieChart tasks={tasks} />
        </Col>
      </Row>

      <Row>
        {/* BAR CHART FOR COMPLETED TASKS */}
        <Col>
          <BarChartCompletedTasks tasks={tasks} />
        </Col>

        {/* BAR CHART FOR DUE TASKS & STUCK TASKS */}
        <Col>
          <BarChartDueTasks tasks={tasks} />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskDashboard;

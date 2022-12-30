import useAuth from "../hooks/useAuth";
import { Badge, Card, Row, Col } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const PersonalAnalytics = ({
  totalTasks,
  totalCompleted,
  totalInProgress,
  totalNew,
  totalStuck,
  dueThisWeek,
  dueNextWeekend,
  dueTwoWeeksFromNow,
  dueThreeWeeksFromNow,
  completedThisWeek,
  completedLastWeek,
  completedTwoWeeksAgo,
}) => {
  const {
    auth: { user },
  } = useAuth();

  const pieChartData = [
    { name: "New Tasks", value: totalNew },
    { name: "In Progress", value: totalInProgress },
    { name: "Stuck", value: totalStuck },
    { name: "Completed", value: totalCompleted },
  ];

  const pieChartColors = ["#92a8d1", "#feb236", "#c94c4c", "#82b74b"];

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

  const barChartData = [
    {
      name: "This week",
      "amount of tasks due": dueThisWeek.length,
      "Stuck Tasks": stuckThisWeek.length,
    },
    {
      name: "Next week",
      "amount of tasks due": dueNextWeekend.length,
      "Stuck Tasks": stuckNextWeek.length,
    },
    {
      name: "Week after",
      "amount of tasks due": dueTwoWeeksFromNow.length,
      "Stuck Tasks": stuckTwoWeeksFromNow.length,
    },
    {
      name: "3 weeks time",
      "amount of tasks due": dueThreeWeeksFromNow.length,
      "Stuck Tasks": stuckThreeWeeksFromNow.length,
    },
  ];

  const barChartDataCompleted = [
    { name: "2 Weeks ago", "Completed Tasks": completedTwoWeeksAgo },
    { name: "Last week", "Completed Tasks": completedLastWeek },
    { name: "This week", "Completed Tasks": completedThisWeek },
  ];

  return (
    <Card className="p-3 m-4 bg-white">
      <Card.Title className="text-uppercase text-center">
        Analytics for Personal Tasks
      </Card.Title>

      <Card.Title className="pl-5">Total tasks: {totalTasks}</Card.Title>

      {/* PIE CHART */}
      <Row>
        <Col className="border border-muted rounded shadow m-3">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={110}
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {pieChartData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={pieChartColors[i % pieChartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>

        {/* BAR CHART */}
        <Col className="border border-muted rounded shadow m-3">
          Number of tasks due
          <BarChart
            className="m-3"
            width={500}
            height={400}
            data={barChartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Stuck Tasks" fill="#c94c4c" stackId="a" />
            <Bar dataKey="amount of tasks due" fill="#feb236" stackId="a" />
          </BarChart>
        </Col>
      </Row>

      {/* 2ND BAR CHART */}
      <Row>
        <Col className="border border-muted rounded shadow m-3">
          Number of tasks Completed
          <BarChart
            width={400}
            height={400}
            data={barChartDataCompleted}
            className="m-3"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed Tasks" fill="#82b74b" />
          </BarChart>
        </Col>

        <Col className="border border-muted rounded shadow m-3">
          Another Graph
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalAnalytics;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent > 0 ? `${(percent * 100).toFixed(0)}%` : null}
    </text>
  );
};

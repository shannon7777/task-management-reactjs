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

  const barChartData = [
    { name: "This week", "amount of tasks due": 5, "Stuck Tasks": 2 },
    { name: "Next week", "amount of tasks due": 4, "Stuck Tasks": 1 },
    { name: "Week after", "amount of tasks due": 8, "Stuck Tasks": 3 },
  ];

  const barChartDataCompleted = [
    { name: "Last week", "Completed Tasks": 3 },
    { name: "This week", "Completed Tasks": 2 },
  ];

  return (
    <Card className="p-3 m-4 bg-white">
      <header className="text-uppercase text-center">
        Analytics for Personal Tasks
      </header>

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
            width={400}
            height={400}
            data={barChartData}
            // margin={{
            //   top: 5,
            //   right: 30,
            //   left: 20,
            //   bottom: 5,
            // }}
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

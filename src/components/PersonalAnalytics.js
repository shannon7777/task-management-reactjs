import useAuth from "../hooks/useAuth";
import { Badge, Card, Row } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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

  const data = [
    { name: "New Tasks", value: totalNew },
    { name: "In Progress", value: totalInProgress },
    { name: "Stuck", value: totalStuck },
    { name: "Completed", value: totalCompleted },
  ];

  const cellColors = ["#92a8d1", "#feb236", "#c94c4c", "#82b74b"];

  return (
    <Card className="border border-secondary shadow p-3 m-4 bg-white">
      <Card.Header className="text-uppercase text-center">
        Analytics for Personal Tasks
      </Card.Header>
      <Row>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={110}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fill={cellColors[i % cellColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
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
  percent
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
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

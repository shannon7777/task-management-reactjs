import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
} from "recharts";

const BarChartDueTasks = ({ barChartDataTasksDue }) => {
  return (
    <BarChart
      className="m-3"
      width={500}
      height={400}
      data={barChartDataTasksDue}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Tasks Stuck & Due" fill="#c94c4c" stackId="a" />
      <Bar dataKey="amount of tasks due" fill="#feb236" stackId="b" />
    </BarChart>
  );
};

export default BarChartDueTasks;

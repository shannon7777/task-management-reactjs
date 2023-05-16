import {
  BarChart,
  Bar,
  Tooltip,
  YAxis,
  XAxis,
  Legend,
  CartesianGrid,
} from "recharts";

const BarChartCompletedTasks = ({ barChartDataCompleted }) => {
  return (
    <BarChart
      className="m-3"
      width={500}
      height={400}
      data={barChartDataCompleted}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Completed Tasks" fill="#82b74b" />
    </BarChart>
  );
};

export default BarChartCompletedTasks;

import { PieChart as PieChartApi, Pie, Cell, Tooltip } from "recharts";

const PieChart = ({ pieChartData, pieChartColors }) => {
  return (
    <PieChartApi width={400} height={400}>
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
    </PieChartApi>
  );
};

export default PieChart;

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

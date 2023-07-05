// import { PieChart as PieChartApi, Pie, Cell, Tooltip } from "recharts";
import { ResponsivePie } from "@nivo/pie";
import { Col } from "react-bootstrap";
import { taskProgressColors } from "../PersonalTasks/TasksPage";

const PieChart = ({ tasks }) => {
  let pieChartData = Object.keys(taskProgressColors).map((progress) => {
    let obj = {};
    obj.id = progress;
    obj.label = progress;
    obj.value = tasks.filter((task) => task.progress === progress).length;
    obj.color = taskProgressColors[progress];
    return obj;
  });

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        colors={pieChartData.map((data) => data.color)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        activeOuterRadiusOffset={8}
        activeInnerRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="white"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Completed",
            },
            id: "lines",
          },
          {
            match: {
              id: "In Progress",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </Col>
  );
};

export default PieChart;

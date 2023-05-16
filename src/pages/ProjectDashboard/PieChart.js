import { ResponsivePie } from "@nivo/pie";
import { Col } from "react-bootstrap";
const PieChart = ({ projectItems }) => {
  const pieChartProgress = [
    {
      id: "Not Started",
      label: "Not Started",
      value: projectItems.filter((item) => item.progress === "Not Started")
        .length,
      color: "#6b7275",
    },
    {
      id: "In Progress",
      label: "In Progress",
      value: projectItems.filter((item) => item.progress === "In Progress")
        .length,
      color: "#186e99",
    },
    {
      id: "Stuck",
      label: "Stuck",
      value: projectItems.filter((item) => item.progress === "Stuck").length,
      color: "#ad470c",
    },
    {
      id: "Awaiting Review",
      label: "Awaiting Review",
      value: projectItems.filter((item) => item.progress === "Awaiting Review")
        .length,
      color: "#bf8b08",
    },
    {
      id: "Completed",
      label: "Completed",
      value: projectItems.filter((item) => item.progress === "Completed")
        .length,
      color: "#356e19",
    },
  ];

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsivePie
        data={pieChartProgress}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        colors={pieChartProgress.map((data) => data.color)}
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

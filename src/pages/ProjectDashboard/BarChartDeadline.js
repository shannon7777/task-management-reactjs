import { Col } from "react-bootstrap";
import { ResponsiveBar } from "@nivo/bar";

const BarChartDeadline = ({ projectItems, progressTypes }) => {
  const startOfTheWeek = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay())
  );
  const thisWeekend = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
  );
  const nextWeekend = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 14)
  );
  const twoWeekendsTime = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 21)
  );
  const threeWeekendsTime = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 28)
  );

  let timeframes = [
    ["this week", thisWeekend, startOfTheWeek],
    ["next week", nextWeekend, thisWeekend],
    ["in 2 weeks", twoWeekendsTime, nextWeekend],
    ["in 3 weeks", threeWeekendsTime, twoWeekendsTime],
  ];

  const data = timeframes.map((timeframe) => {
    const obj = {};
    obj.timeframe = timeframe[0];
    Object.keys(progressTypes).forEach((progress) => {
      obj[progress] = projectItems.filter(
        (item) =>
          new Date(item.deadline) < timeframe[1] &&
          timeframe[2] < new Date(item.deadline) &&
          progress === item.progress
      ).length;
    });
    return obj;
  });

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={Object.keys(progressTypes)}
        indexBy="timeframe"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="stacked"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={Object.values(progressTypes)}
        colorBy="id"
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
              id: "Not Started",
            },
            id: "lines",
          },
          {
            match: {
              id: "Completed",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "TIMEFRAMES",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "PROJECT ITEMS DUE FOR THE MONTH",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
      />
    </Col>
  );
};

export default BarChartDeadline;

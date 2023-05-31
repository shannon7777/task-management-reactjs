import { ResponsiveBar } from "@nivo/bar";
import { Col } from "react-bootstrap";

const BarChartCompletedTasks = ({ tasks }) => {
  const today = new Date();
  const startOfTheWeek = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay())
  );
  const lastWeekMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
  );
  const twoWeeksAgoMonday = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() - 13)
  );

  let timeframes = [
    ["this week", today, startOfTheWeek],
    ["last week", startOfTheWeek, lastWeekMonday],
    ["2 weeks ago", lastWeekMonday, twoWeeksAgoMonday],
  ];

  const data = timeframes.map((timeframe) => {
    let obj = {};
    obj.timeframe = timeframe[0];
    obj.completed = tasks.filter(
      (task) =>
        new Date(task.completedDate) <= timeframe[1] &&
        new Date(task.completedDate) >= timeframe[2] &&
        task.progress === "Completed"
    ).length;
    return obj;
  });

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["completed"]}
        indexBy="timeframe"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors="green"
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
          legend: "TASKS COMPLETED",
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

export default BarChartCompletedTasks;

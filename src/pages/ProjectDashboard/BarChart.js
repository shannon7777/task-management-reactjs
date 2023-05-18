import { ResponsiveBar } from "@nivo/bar";
import { Col } from "react-bootstrap";
// import { useState } from "react";

const BarChart = ({ project_id, projectItems, progressTypes }) => {
  // const [grouped, setGrouped] = useState(false);

  let categories = JSON.parse(localStorage.getItem(`categories-${project_id}`));

  // format into array of color objects for barchart component
  const data = categories.map((c) => {
    const obj = {};
    obj.category = c.title;
    Object.keys(progressTypes).forEach((progress) => {
      obj[progress] = projectItems.filter(
        (item) => item.progress === progress && c._id === item.category_id
      ).length;
    });
    return obj;
  });

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      {/* <button onClick={() => setGrouped((prev) => !prev)}>
        {grouped ? `stacked` : "grouped"}
      </button> */}
      <ResponsiveBar
        data={data}
        keys={Object.keys(progressTypes)}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="stacked"
        // groupMode={grouped ? "grouped" : "stacked"}
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
          legend: "PROJECT CATEGORIES",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "number of project items",
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

export default BarChart;

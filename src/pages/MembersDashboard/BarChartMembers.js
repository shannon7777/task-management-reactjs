import { ResponsiveBar } from "@nivo/bar";
import { Col } from "react-bootstrap";

const BarChartMembers = ({ teamMembers, project_id }) => {
  const projectItems = JSON.parse(
    localStorage.getItem(`projectItems-${project_id}`)
  );

  let progressTypesObj = {
    "Not Started": "#6b7275",
    "In Progress": "#186e99",
    Stuck: "#ad470c",
    "Awaiting Review": "#bf8b08",
    Completed: "#356e19",
  };

  let progressTypes = {};
  let progressArr = [
    ...new Set(projectItems?.map((item) => item.progress)),
  ].map((progress) => {
    progressTypes[progress] = progressTypesObj[progress];
    return progressTypes;
  });

  const data = teamMembers.map((member) => {
    let obj = {};
    obj.member = member.username;
    obj.memberId = member._id;
    Object.keys(progressTypes).forEach((progress) => {
      obj[progress] = projectItems.filter(
        (item) => item.progress === progress && item.owners.includes(member._id)
      ).length;
    });
    return obj;
  });

  let membersImgObj = {};
  teamMembers.forEach((member) => {
    let img = JSON.parse(localStorage.getItem(`memberImg-${member._id}`));
    membersImgObj[`memberImg-${member._id}`] = img;
  });

  const customMemberImage = ({ bars }) => {
    console.log(bars);
    let size = 24;
    let images = bars.map(({ key, x, y, width, height, data }) => (
      <image
        style={{ borderRadius: "15px" }}
        // href="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        href={JSON.parse(
          localStorage.getItem(`memberImg-${data.data.memberId}`)
        )}
        key={key}
        // x={x + width / 2 - size / 2}
        y={y + height / 3 - size / 3}
        height={size}
        width={size}
      />
    ));
    return images;
  };

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={Object.keys(progressTypes)}
        indexBy="member"
        layout="horizontal"
        groupMode="stacked"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={Object.values(progressTypes)}
        layers={[
          "grid",
          "axes",
          "bars",
          "markers",
          "legends",
          "annotations",
          customMemberImage,
        ]}
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
        borderRadius={10}
        borderWidth={1}
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
          legend: "Number of Tasks",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "PROJECT MEMBERS",
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

export default BarChartMembers;

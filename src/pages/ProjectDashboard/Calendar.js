import { ResponsiveTimeRange } from "@nivo/calendar";
import { Col } from "react-bootstrap";

const Calendar = ({ projectItems }) => {
  const startDate = () => {
    let deadlines = projectItems.sort(
      (a, b) => new Date(b.deadline) - new Date(a.deadline)
    );

    return deadlines[deadlines.length - 1].deadline;
  };

  const endDate = () => {
    let deadlines = projectItems.sort(
      (a, b) => new Date(b.deadline) - new Date(a.deadline)
    );
    return deadlines[0].deadline;
  };

  const data = [];

  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <ResponsiveTimeRange
        data={data}
        from={startDate()}
        to={endDate()}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        minValue={105}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        monthLegendOffset={14}
        weekdayLegendOffset={74}
        dayRadius={7}
        daySpacing={3}
        dayBorderWidth={2}
        dayBorderColor="#ebebeb"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 50,
            itemsSpacing: 21,
            itemDirection: "right-to-left",
            translateX: -77,
            translateY: -72,
            symbolSize: 20,
          },
        ]}
      />
    </Col>
  );
};

export default Calendar;

import { useState, useEffect } from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { Badge, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

const Calendar = ({ projectItems, progressTypes }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dates, setDates] = useState(dayjs());
  const daysOfTheWeek = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    setDates(firstItemDueDate());
  }, []);

  const firstItemDueDate = () => {
    let deadlines = projectItems.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
    const firstDate = deadlines[0].deadline;
    return dayjs(new Date(firstDate));
  };
  console.log(firstItemDueDate());

  // generate all dates within specified month & year
  const generateDates = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
    let datesArr = [];

    // generating dates on calendar that dont belong to current month (prefix)
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      datesArr.push({ date: firstDateOfMonth.day(i), currentMonth: false });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      datesArr.push({ date: firstDateOfMonth.date(i), currentMonth: true });
    }

    // generating the suffix dates that don't belong to the month
    let remainingDays = 42 - datesArr.length;

    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remainingDays;
      i++
    ) {
      datesArr.push({ date: lastDateOfMonth.date(i), currentMonth: false });
    }

    return datesArr;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Row>
      <Col
        className="border shadow rounded m-2"
        style={{ height: "400px", width: "400px" }}
      >
        <div className="d-flex justify-content-around mt-2">
          <h4>
            {months[dates.month()]}, {dates.year()}
          </h4>
          <div>
            <FontAwesomeIcon
              className="mx-3"
              icon={faBackward}
              style={{ cursor: "pointer" }}
              onClick={() => setDates(dates.month(dates.month() - 1))}
            />
            <Badge
              onClick={() => setDates(dayjs())}
              style={{ cursor: "pointer" }}
            >
              today
            </Badge>
            <FontAwesomeIcon
              className="mx-3"
              icon={faForward}
              style={{ cursor: "pointer" }}
              onClick={() => setDates(dates.month(dates.month() + 1))}
            />
          </div>
        </div>
        <div className="calendar p-2">
          {daysOfTheWeek.map((day, index) => (
            <h6 key={index} className="text-center mt-3">
              {day}
            </h6>
          ))}

          {generateDates(dates.month(), dates.year()).map(
            ({ date, currentMonth }, index) => (
              <h6
                className={`text-center ${!currentMonth ? "opacity-25" : ""}`}
                key={index}
              >
                {date.date()}
              </h6>
            )
          )}
        </div>
      </Col>

      <Col></Col>
    </Row>
  );

  // const startDate = () => {
  //   let deadlines = projectItems.sort(
  //     (a, b) => new Date(b.deadline) - new Date(a.deadline)
  //   );
  //   return deadlines[deadlines.length - 1].deadline;
  // };

  //   const endDate = () => {
  //     let deadlines = projectItems.sort(
  //       (a, b) => new Date(b.deadline) - new Date(a.deadline)
  //     );
  //     return deadlines[0].deadline;
  //   };

  //   const formatDate = (deadline) => {
  //     return new Date(deadline).toISOString().split("T")[0];
  //   };

  //   const data = projectItems.map((item) => {
  //     let dataObj = {};
  //     dataObj.value = projectItems.filter(
  //       ({ deadline }) => deadline === item.deadline
  //     ).length;
  //     dataObj.day = formatDate(item.deadline);
  //     return dataObj;
  //   });

  //   return (
  //     <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
  //       <ResponsiveTimeRange
  //         data={data}
  //         from={startDate()}
  //         to={endDate()}
  //         emptyColor="#eeeeee"
  //         colors={Object.values(progressTypes)}
  //         // minValue={100}
  //         margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
  //         monthLegendOffset={14}
  //         weekdayLegendOffset={74}
  //         dayRadius={7}
  //         daySpacing={3}
  //         dayBorderWidth={2}
  //         dayBorderColor="#ebebeb"
  //         tooltip={({ day, value }) => (
  //           <div className="border bg-dark text-white rounded p-2">
  //             <div>{day}</div>
  //             {projectItems
  //               .filter((item) => formatDate(item.deadline) === day)
  //               .map((item, index) => (
  //                 <div key={index}>
  //                   {index + 1}:{item.item}
  //                 </div>
  //               ))}
  //           </div>
  //         )}
  //         legends={[
  //           {
  //             anchor: "bottom-right",
  //             direction: "row",
  //             justify: false,
  //             itemCount: 4,
  //             itemWidth: 42,
  //             itemHeight: 50,
  //             itemsSpacing: 21,
  //             itemDirection: "right-to-left",
  //             translateX: -77,
  //             translateY: -72,
  //             symbolSize: 20,
  //           },
  //         ]}
  //       />
  //     </Col>
  //   );
};

export default Calendar;

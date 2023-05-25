import { useState, useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Calendar = ({ projectItems }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dates, setDates] = useState(dayjs());
  const [hover, setHover] = useState(null);
  const daysOfTheWeek = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    setDates(firstItemDueDate());
  }, [projectItems]);

  const firstItemDueDate = () => {
    let deadlines = projectItems.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
    const firstDate = deadlines[0].deadline;
    return dayjs(firstDate);
  };

  // generate all dates within specified month & year
  const generateDates = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
    let datesArr = [];

    // generating dates on calendar that dont belong to current month (prefix)
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      datesArr.push({
        date: firstDateOfMonth.day(i),
        currentMonth: false,
      });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      datesArr.push({
        date: firstDateOfMonth.date(i),
        currentMonth: true,
      });
    }

    // generating the suffix dates that don't belong to the month
    let remainingDays = 42 - datesArr.length;

    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remainingDays;
      i++
    ) {
      datesArr.push({
        date: lastDateOfMonth.date(i),
        currentMonth: false,
      });
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
    <>
      <Col className="border shadow rounded m-2" style={{ height: "400px" }}>
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
              onClick={() => {
                setSelectedDate(dayjs());
                setDates(dayjs());
              }}
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
            <h5 key={index} className="text-center my-2">
              {day}
            </h5>
          ))}

          {generateDates(dates.month(), dates.year()).map(
            ({ date, currentMonth }, index) => (
              <h6
                key={index}
                onMouseOver={() => setHover(index)}
                onMouseOut={() => setHover(null)}
                className={`${!currentMonth ? "opacity-25" : ""} 
                ${hover === index && "bg-secondary rounded"} ${
                  date.toDate().toDateString() ===
                    selectedDate.toDate().toDateString() &&
                  "bg-secondary rounded text-white"
                } ${
                  date.toDate().toDateString() ===
                    dayjs().toDate().toDateString() && "bg-primary rounded"
                } ${
                  projectItems.some(
                    ({ deadline }) =>
                      dayjs(deadline).toDate().toDateString() ===
                      date.toDate().toDateString()
                  ) && "border border-danger"
                } p-2 m-1`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDate(date)}
              >
                {date.date()}
              </h6>
            )
          )}
        </div>
      </Col>

      <Col className="border shadow rounded m-2 py-2">
        <h4>
          <Badge bg="dark">{selectedDate.toDate().toDateString()}</Badge>
        </h4>
        <hr />
        {projectItems
          .filter(
            (item) =>
              dayjs(item.deadline).toDate().toDateString() ===
              selectedDate.toDate().toDateString()
          )
          .map((item, index) => (
            <blockquote className="w-100" key={index}>
              <h6>
                {`Item due: ${item.item}`}
                <span>
                  {item.progress === "Completed" && (
                    <FontAwesomeIcon
                      className="mx-4"
                      icon={faCheckCircle}
                      color="green"
                    />
                  )}
                </span>
              </h6>
            </blockquote>
          ))}
      </Col>
    </>
  );
};

export default Calendar;

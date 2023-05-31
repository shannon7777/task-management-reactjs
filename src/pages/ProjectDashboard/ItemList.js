import { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ItemList = ({ projectItems, progressTypes }) => {
  const [items, setItems] = useState(projectItems);
  // const [filter, setFilter] = useState({
  //   overdue: false,
  //   dueThisWeek: false,
  //   completed: false,
  //   incomplete: false,
  // });
  // make a filter to show items that are overdue && due this week

  // const itemsDueThisWeek = (deadline) => {
  //   const thisWeekend = new Date(
  //     new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
  //   );
  //   const startOfTheWeek = new Date(
  //     new Date().setDate(new Date().getDate() - new Date().getDay())
  //   );
  //   return (
  //     startOfTheWeek < new Date(deadline) && new Date(deadline) < thisWeekend
  //   );
  // };
  // const overdue = (deadline) => {
  //   let dateToday = new Date().setHours(0, 0, 0, 0);
  //   return new Date(deadline) < dateToday;
  // };

  // const checkboxes = [
  //   { label: "Overdue", value: overdue() },
  //   { label: "Due This Week", value: itemsDueThisWeek() },
  //   { label: "Completed", value: (deadline) => deadline === "Completed" },
  //   { label: "Not completed", value: (deadline) => deadline !== "Completed" },
  // ];

  return (
    <Col
      className="m-2 p-3 shadow border rounded"
      style={{ height: 400, overflow: "auto" }}
    >
      <h5>Project Items sorted by due date</h5>
      {/* {checkboxes.map((check, index) => ( */}
        <Form.Check
          inline
          name="dueDates"
          type="radio"
          label="Overdue"
          // label={check.label}
          // key={`${index}`}
          onClick={() => setItems(projectItems.filter(item => overdue(item.deadline)))}
        />
        <Form.Check
          inline
          name="dueDates"
          type="radio"
          label="Due This Week"
          // label={check.label}
          // key={`${index}`}
          onClick={() => setItems(projectItems.filter(item => itemsDueThisWeek(item.deadline)))}
        />
        <Form.Check
          inline
          name="dueDates"
          type="radio"
          label="Completed"
          // label={check.label}
          // key={`${index}`}
          onClick={() => setItems(projectItems.filter(item => item.progress === "Completed"))}
        />
        <Form.Check
          inline
          name="dueDates"
          type="radio"
          label="Incomplete"
          // label={check.label}
          // key={`${index}`}
          onClick={() => setItems(projectItems.filter(item => item.progress !== "Completed"))}
        />
      {/* ))} */}
      <hr />
      <section>
        {items
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .map((item) => (
            <div
              className="d-flex justify-content-between rounded text-white m-2 p-2 shadow"
              key={`item-${item._id}`}
              style={{
                background: "black",
                border: `${
                  overdue(item.deadline) ? "2px darkred solid" : null
                }`,
                textDecoration: `${
                  item.progress === "Completed" ? "line-through" : null
                }`,
              }}
            >
              {item.item}
              <span>
                {item.progress === "Completed" && (
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                )}
              </span>
              <div
                style={{
                  background: `${progressTypes[item.progress]}`,
                  width: "7px",
                }}
              ></div>
            </div>
          ))}
      </section>
    </Col>
  );
};

export default ItemList;

export const itemsDueThisWeek = (deadline) => {
  const thisWeekend = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
  );
  const startOfTheWeek = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay())
  );
  return (
    startOfTheWeek < new Date(deadline) && new Date(deadline) < thisWeekend
  );
};

export const overdue = (deadline) => {
  let dateToday = new Date().setHours(0, 0, 0, 0);
  return new Date(deadline) < dateToday;
};

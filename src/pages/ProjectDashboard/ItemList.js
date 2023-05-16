import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ItemList = ({ projectItems }) => {
  const colorStatus = {
    "Not Started": "#6b7275",
    "In Progress": "#186e99",
    Stuck: "#ad470c",
    "Awaiting Review": "#bf8b08",
    Completed: "#356e19",
  };

  let dateToday = new Date().setHours(0, 0, 0, 0);

  const dueThisWeek = (deadline) => {
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
  const overdue = (deadline) => {
    return new Date(deadline) < dateToday;
  };

  return (
    <Col
      className="m-2 p-2 shadow border rounded"
      style={{ height: 400, overflow: "auto" }}
    >
      {projectItems
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .map((item) => (
          <div
            className="d-flex justify-content-between rounded text-white m-2 p-2 shadow"
            key={`item-${item._id}`}
            style={{
              background: "black",
              border: `${overdue(item.deadline) ? "2px darkred solid" : null}`,
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
                background: `${colorStatus[item.progress]}`,
                width: "7px",
              }}
            ></div>
          </div>
        ))}
    </Col>
  );
};

export default ItemList;

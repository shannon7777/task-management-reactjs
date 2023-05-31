import { overdue } from "../ProjectDashboard/ItemList";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";

const UserProjectItems = ({ projectItems, user, progressTypes }) => {
  return (
    <Col className="m-2 shadow border rounded" style={{ height: 400 }}>
      <section>
        {projectItems
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .filter((item) => item.owners.includes(user._id))
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

export default UserProjectItems;

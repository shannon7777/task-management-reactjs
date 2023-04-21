import DatePicker from "react-datepicker";
import { useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";

import { timelineBar, progressColors } from "../Projectlist/Project";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ editItem, projectItem, completion_date }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { _id, deadline, createdAt } = projectItem;
  const edit = (date) => {
    setShowDatePicker(false);
    let editedDeadline = { deadline: date.toDateString() };
    editItem(_id, editedDeadline);
  };

  return (
    <td onMouseLeave={() => setShowDatePicker(false)}>
      <Row className="d-flex">
        {showDatePicker ? (
          <Col className="d-flex">
            <DatePicker
              className="btn btn-outline-success shadow"
              onChange={(date) => edit(date)}
              selected={new Date(deadline)}
              value={new Date(deadline)}
              minDate={new Date()}
              maxDate={new Date(completion_date)}
              showPopperArrow={false}
              dateFormat="MMMM d, yyyy"
              placeholderText="change deadline"
            />
          </Col>
        ) : (
          <>
            <Col
              md={8}
              onClick={() => setShowDatePicker((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {deadline}
              <ProgressBar
                variant={progressColors(createdAt, deadline)}
                animated
                now={timelineBar(createdAt, deadline)}
              />
            </Col>
            <Col md={4}>
              <FontAwesomeIcon className="mx-3" icon={faFlag} />
            </Col>
          </>
        )}
      </Row>
    </td>
  );
};

export default Deadline;

import DatePicker from "react-datepicker";
import { useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ editItem, deadline, item_id }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const edit = (date) => {
    setShowDatePicker(false);
    let editedDeadline = { deadline: date.toDateString() };
    editItem(item_id, editedDeadline);
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
              <ProgressBar variant="success" animated now={50} />
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

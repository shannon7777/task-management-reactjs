// import DatePicker from "react-datepicker";
import { useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";

import { timelineBar, progressColors } from "../Projectlist/Project";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TableCell } from "@mui/material";
import dayjs from "dayjs";

const Deadline = ({ editItem, projectItem, completion_date }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { _id, deadline, createdAt } = projectItem;
  const edit = (date) => {
    setShowDatePicker(false);
    let editedDeadline = { deadline: dayjs(date).toDate().toDateString() };
    editItem(_id, editedDeadline);
  };

  return (
    <TableCell sx={{ maxWidth: 5 }}>
      <Row className="d-flex" onMouseLeave={() => setShowDatePicker(false)}>
        {showDatePicker ? (
          <Col className="d-flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: 150,
                }}
                className="mt-3"
                label={
                  completion_date
                    ? "Edit the completion date"
                    : "Please set a completion date"
                }
                value={dayjs(completion_date)}
                onChange={(date) => edit(date)}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </Col>
        ) : (
          <>
            <Col
              onClick={() => setShowDatePicker((prev) => !prev)}
              style={{ cursor: "pointer", width: 0 }}
            >
              {deadline}
              <ProgressBar
                variant={progressColors(createdAt, deadline)}
                animated
                now={timelineBar(createdAt, deadline)}
              />
            </Col>
          </>
        )}
      </Row>
    </TableCell>
  );
};

export default Deadline;

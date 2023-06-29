import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import { timelineBar, progressColors } from "../Projectlist/Project";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LinearProgress, TableCell, Typography } from "@mui/material";
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
                label="Edit the completion date"
                value={dayjs(deadline)}
                onChange={(date) => edit(date)}
                slotProps={{ textField: { size: "small" } }}
                maxDate={dayjs(completion_date)}
              />
            </LocalizationProvider>
          </Col>
        ) : (
          <>
            <Col
              onClick={() => setShowDatePicker((prev) => !prev)}
              style={{ cursor: "pointer", width: 0 }}
            >
              <Typography variant="h6">{deadline}</Typography>
              <LinearProgress
                variant="determinate"
                value={timelineBar(createdAt, deadline)}
                sx={{
                  height: 7,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: progressColors(createdAt, deadline),
                  },
                  bgcolor: "grey",
                }}
              />
            </Col>
          </>
        )}
      </Row>
    </TableCell>
  );
};

export default Deadline;

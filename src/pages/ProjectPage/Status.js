import { useState } from "react";
import SelectTaskStatus from "../../components/SelectTaskStatus";
import { Box, TableCell } from "@mui/material";

const Status = ({ progress, item_id, editItem }) => {
  const [show, setShow] = useState(false);
  const selectOptions = [
    "Not Started",
    "In Progress",
    "Stuck",
    "Awaiting Review",
    "Completed",
  ];

  const progressColors = {
    "Not Started": "#c9c7c1",
    "In Progress": "#92a8d1",
    Stuck: "#c94c4c",
    "Awaiting Review": "#c4971a",
    Completed: "#82b74b",
  };

  const onSelect = (e) => {
    let editedObj = { progress: e.target.value };
    editItem(item_id, editedObj);
  };

  return (
    <TableCell
      sx={{
        maxWidth: 50,
        cursor: "pointer",
        bgcolor: progressColors[progress],
      }}
      onClick={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show ? (
        <span>
          <SelectTaskStatus
            selectOptions={selectOptions}
            progress={progress}
            onChange={onSelect}
          />
        </span>
      ) : (
        <p>{progress}</p>
      )}
    </TableCell>
  );
};

export default Status;

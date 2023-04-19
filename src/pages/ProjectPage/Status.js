import { useState } from "react";
import SelectTaskStatus from "../Home/SelectTaskStatus";

const Status = ({ progress, item_id, editItem }) => {
  const [hover, setHover] = useState(false);
  const selectOptions = [
    "Not Started",
    "In Progress",
    "Stuck",
    "Awaiting Review",
    "Completed",
  ];

  const onSelect = (e) => {
    let editedObj = { progress: e.target.value };
    editItem(item_id, editedObj);
  };

  return (
    <td onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      {hover ? (
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
    </td>
  );
};

export default Status;

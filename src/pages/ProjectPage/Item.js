import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { disableNewlines } from "./ProjectPage";
import { Box, IconButton, TableCell } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Item = ({ projectItem, editItem, deleteItem }) => {
  const [hover, onHover] = useState(false);
  const [item, setItem] = useState("");
  const edit = () => {
    if (!item) return;
    editItem(projectItem._id, { item });
  };

  return (
    <TableCell
      sx={{ maxWidth: 10 }}
      onMouseOver={() => onHover(true)}
      onMouseOut={() => onHover(false)}
    >
      <div className="d-flex justify-content-between">
        <p
          suppressContentEditableWarning={true}
          contentEditable={true}
          onBlur={edit}
          onInput={(e) => setItem(e.target.innerHTML)}
          onKeyDown={disableNewlines}
          value={item}
          name="item"
          type="text"
          style={{ cursor: "pointer" }}
        >
          {projectItem?.item}
        </p>
        {hover && (
          <span className="justify-content-between">
            <IconButton size="small">
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => deleteItem(projectItem._id)}
              size="small"
            >
              <Delete />
            </IconButton>
          </span>
        )}
      </div>
    </TableCell>
  );
};

export default Item;

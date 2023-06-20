import { useState } from "react";

import { disableNewlines } from "./ProjectPage";
import { IconButton, TableCell, Typography } from "@mui/material";
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
      sx={{ maxWidth: 100 }}
      onMouseOver={() => onHover(true)}
      onMouseOut={() => onHover(false)}
    >
      <div className="d-flex justify-content-between">
        <Typography
          variant="h6"
          suppressContentEditableWarning={true}
          contentEditable={true}
          onBlur={edit}
          onInput={(e) => setItem(e.target.innerHTML)}
          onKeyDown={disableNewlines}
          sx={{
            "&:focus": {
              outline: "none",
              border: "none",
            },
            cursor: "pointer",
          }}
        >
          {projectItem?.item}
        </Typography>
          {hover && (
            <IconButton
              onClick={() => deleteItem(projectItem._id)}
              size="small"
            >
              <Delete />
            </IconButton>
          )}
      </div>
    </TableCell>
  );
};

export default Item;

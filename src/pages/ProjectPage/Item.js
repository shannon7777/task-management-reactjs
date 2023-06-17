import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { disableNewlines } from "./ProjectPage";

const Item = ({ projectItem, editItem, deleteItem }) => {
  const [hover, onHover] = useState(false);
  const [item, setItem] = useState("");
  const edit = () => {
    if (!item) return;
    editItem(projectItem._id, { item });
  };

  return (
    <div
      className="d-flex justify-content-between"
      onMouseOver={() => onHover(true)}
      onMouseOut={() => onHover(false)}
    >
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
        <span className="">
          <FontAwesomeIcon
            className="mx-2"
            icon={faEdit}
            size="lg"
            style={{ cursor: "pointer" }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => deleteItem(projectItem._id)}
            size="lg"
            style={{ cursor: "pointer" }}
          />
        </span>
      )}
    </div>
  );
};

export default Item;

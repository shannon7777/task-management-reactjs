import { useState } from "react";
import { Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

const Item = ({ projectItem, editItem, deleteItem }) => {
  const [hover, onHover] = useState(false);
  const [item, setItem] = useState("");
  const edit = () => {
    if (!item) return;
    editItem(projectItem._id, { item });
  };

  const disableNewlines = (e) => {
    const keyCode = e.keyCode || e.which;

    if (keyCode === 13) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  };

  return (
    <td onMouseOver={() => onHover(true)} onMouseOut={() => onHover(false)}>
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
    </td>
  );
};

export default Item;

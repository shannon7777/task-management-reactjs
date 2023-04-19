import { useState } from "react";
import { Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Item = ({ projectItem, editItem, deleteItem, onChange }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [hover, onHover] = useState(false);
  const [item, setItem] = useState("");
  const edit = (id) => {
    editItem(id);
    setShowEdit((prev) => !prev);
  };

  return (
    <td onMouseOver={() => onHover(true)} onMouseOut={() => onHover(false)}>
      {showEdit ? (
        <Form className="d-flex">
          <Form.Control
            style={{ width: "50%", height: "20px" }}
            type="text"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          ></Form.Control>
          <FontAwesomeIcon
            icon={faCircleCheck}
            onClick={() => edit(projectItem._id)}
            size="lg"
          />
          <FontAwesomeIcon
            className="mx-2"
            icon={faXmark}
            onClick={() => setShowEdit(false)}
            size="lg"
          />
        </Form>
      ) : (
        <div className="d-flex">
          <p className="mr-auto">{projectItem?.item}</p>
          {hover && (
            <span className="">
              <FontAwesomeIcon
                className=""
                icon={faEdit}
                onClick={() => setShowEdit((prev) => !prev)}
                size="lg"
                style={{ cursor: "pointer" }}
              />
              <FontAwesomeIcon
                className="mx-3"
                icon={faXmark}
                onClick={() => deleteItem(projectItem._id)}
                size="lg"
                style={{ cursor: "pointer" }}
              />
            </span>
          )}
        </div>
      )}
    </td>
  );
};

export default Item;

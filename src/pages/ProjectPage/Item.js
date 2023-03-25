import { useState } from "react";
import { Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Item = ({ item, editItem, item_id }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [hover, onHover] = useState(false);
  const [itemForm, setItemForm] = useState("");

  const onSubmitEdit = (e) => {
    e.preventDefault();
    editItem({ item: itemForm }, item_id);
    setShowEdit((prev) => !prev);
  };

  return (
    <td onMouseOver={() => onHover(true)} onMouseOut={() => onHover(false)}>
      {showEdit ? (
        <Form className="d-flex">
          <Form.Control
            style={{ width: "50%", height: "20px" }}
            type="text"
            name="itemForm"
            value={itemForm}
            onChange={(e) => setItemForm(e.target.value)}
            onSubmit={onSubmitEdit}
          ></Form.Control>
          <FontAwesomeIcon
            icon={faCircleCheck}
            onClick={onSubmitEdit}
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
          <p>{item}</p>
          {hover && (
            <FontAwesomeIcon
              className="mx-auto"
              icon={faEdit}
              onClick={() => setShowEdit((prev) => !prev)}
              size="lg"
            />
          )}
        </div>
      )}
    </td>
  );
};

export default Item;

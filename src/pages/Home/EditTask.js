import { useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-datepicker";

const EditTask = ({ task, editTask, showEditTask, setShowEditTask }) => {
  const [formData, setFormData] = useState({
    text: "",
    description: "",
  });

  const [dateToComplete, setDateToComplete] = useState(
    task.dateToComplete === "No completion date has been set"
      ? null
      : new Date(task.dateToComplete)
  );

  const { text, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Making a new Object with ONLY the Updated Properties, omitting the unchanged properties
    //Convert formData obj to arrays using Object.entries, then filter each array for empty string
    // Convert arrays back into object and POST it over
    const editedObj = Object.fromEntries(
      Object.entries(formData).filter((value) => value[1] !== "")
    );

    editTask(task._id, {
      ...editedObj,
      dateToComplete: dateToComplete
        ? dateToComplete.toDateString()
        : `No completion date has been set`,
    });
    setShowEditTask((prev) => !prev);
    setFormData({ text: "", description: "" });
  };

  return (
    <>
      <Modal
        centered
        show={showEditTask}
        onHide={() => setShowEditTask((prev) => !prev)}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={text}
                placeholder={task.text}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="description"
                value={description}
                placeholder={task.description}
                onChange={onChange}
                rows={3}
              />
            </Form.Group>

            <Form.Label>
              {dateToComplete
                ? `Edit the date of completion for your task`
                : `Set a date of completion`}{" "}
              :{" "}
            </Form.Label>
            <Form.Group className="d-flex" controlId="datePicker">
              <Col>
                <DatePicker
                  className="btn btn-outline-success shadow"
                  selected={dateToComplete}
                  value={dateToComplete}
                  onChange={(date) => setDateToComplete(date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  showPopperArrow={false}
                  placeholderText="No completion date set"
                />
              </Col>
              <Col>
                {dateToComplete && (
                  <RiDeleteBin5Line
                    onClick={() => setDateToComplete(null)}
                    style={{ cursor: "pointer" }}
                    size={30}
                    color="black"
                  />
                )}
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="danger"
              onClick={() => setShowEditTask(!showEditTask)}
            >
              Close
            </Button>
            <Button variant="outline-success" type="submit" onClick={onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditTask;

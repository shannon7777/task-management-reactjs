import { useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-datepicker";

const EditTask = ({
  task,
  editTask,
  onShowEdit,
  showEditTask,
  setShowEditTask,
}) => {
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
    // if there are no changes made in the edit task window, clear modal and return function
    // if(!text && !description && dateToComplete.toDateString() === task.dateToComplete) return onShowEdit();

    editTask(task._id, {
      ...formData,
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
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={text}
                placeholder={task.text}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
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
            <Form.Group className="d-flex">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onShowEdit}>
            Close
          </Button>
          <Button variant="outline-success" type="submit" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTask;

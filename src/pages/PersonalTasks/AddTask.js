import { Form, Button, Collapse, Col } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({
  addTask,
  showAddTask,
  formData,
  dateToComplete,
  setDateToComplete,
  onChange,
}) => {
  return (
    <Collapse in={showAddTask}>
      <div id="collapse-addForm">
        <Form
          className="border rounded border-secondary shadow p-3 my-3"
          onSubmit={addTask}
        >
          <Form.Group className="mb-3" controlId="formText">
            <Form.Label>Task</Form.Label>
            <Form.Control
              className="border-secondary shadow"
              type="text"
              placeholder="Add Task"
              name="text"
              value={formData.text}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              className="border-secondary shadow"
              type="text"
              placeholder="Add description"
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={3}
            />
            <Form.Group
              className="my-3 d-flex justify-content-center"
              controlId="formDatePicker"
            >
              <Col>
                <Form.Label>
                  Date of <strong>completion</strong> :{" "}
                </Form.Label>
              </Col>

              <Col>
                <DatePicker
                  className="btn btn-outline-success shadow"
                  selected={dateToComplete}
                  value={dateToComplete}
                  onChange={(date) => setDateToComplete(date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  showPopperArrow={false}
                  placeholderText="Click here to set a date"
                />
              </Col>
              <Col>
                {dateToComplete && (
                  <RiDeleteBin5Line
                    onClick={() => setDateToComplete(null)}
                    style={{ cursor: "pointer", color: "crimson" }}
                    size={25}
                  />
                )}
              </Col>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="saveButton">
            <Button variant="success" type="submit">
              Save Task
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Collapse>
  );
};

export default AddTask;

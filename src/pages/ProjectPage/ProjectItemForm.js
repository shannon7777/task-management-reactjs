import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

const ProjectItemForm = ({
  deadline,
  setDeadline,
  createProjectItem,
  setShowForm,
  item,
  setItem,
  category_id,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    createProjectItem(category_id);
    setShowForm((prev) => !prev);
  };

  return (
    <Form className="m-3">
      <Row>
        <Col>
          <Form.Group className="my-3" controlId="formItem">
            <Form.Label>Project Item</Form.Label>
            <Form.Control
              value={item}
              type="text"
              name="item"
              onChange={(e) => setItem(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="my-3" controlId="datePicker">
            <Form.Label>Set a deadline</Form.Label>
            <DatePicker
              className="btn btn-outline-dark shadow"
              onChange={(date) => setDeadline(date)}
              selected={deadline}
              value={deadline}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              showPopperArrow={false}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button
        className="px-3 mx-auto"
        variant="success"
        onClick={onSubmit}
        type="submit"
      >
        Add
      </Button>
      <Button
        className="mx-3"
        variant="danger"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default ProjectItemForm;

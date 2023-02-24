import { Form, Button, Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

const ProjectItemForm = ({
  formData,
  setFormData,
  onSubmit,
  onChange,
  setShowAddProjectItem,
}) => {
  return (
    <Form className="m-3">
      <Row>
        <Col>
          <Form.Group className="my-3" controlId="formItem">
            <Form.Label>Project Item</Form.Label>
            <Form.Control
              className=""
              value={formData.item}
              type="item"
              name="item"
              onChange={onChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="my-3" controlId="datePicker">
            <Form.Label>Set a deadline</Form.Label>
            <ReactDatePicker
              className="btn btn-outline-dark shadow"
              onChange={(date) => setFormData({ ...formData, deadline: date })}
              selected={formData.deadline}
              value={formData.deadline}
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
        onClick={() => setShowAddProjectItem((prev) => !prev)}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default ProjectItemForm;

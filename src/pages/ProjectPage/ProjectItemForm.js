import { Form, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

const ProjectItemForm = ({
  item,
  setItem,
  onSubmit,
  setShowAddProjectItem,
}) => {
  return (
    <Form className="m-3">
      <Form.Group className="my-3" controlId="formItem">
        <Form.Label>Project Item</Form.Label>
        <Form.Control
          className=""
          value={item}
          type="item"
          name="item"
          onChange={(e) => setItem(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        {/* <ReactDatePicker onChange={(date) => setDateCompletion()} /> */}
      </Form.Group>
      <Button onClick={onSubmit}>Add</Button>
      <Button onClick={() => setShowAddProjectItem((prev) => !prev)}>
        Cancel
      </Button>
    </Form>
  );
};

export default ProjectItemForm;

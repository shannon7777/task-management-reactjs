import { Form, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

const ProjectItemForm = ({ item, onSubmit, setShowAddProjectItem }) => {
  return (
    <Form className="m-3">
      <Form.Group className="my-3">
        <Form.Label>Project Item</Form.Label>
        <Form.Control
          className=""
          value={item}
          name="item"
          onChange={(e) => {
            e.target.name = e.target.value;
          }}
        />
      </Form.Group>

      <Form.Group>
        {/* <ReactDatePicker onChange={(date) => setDateCompletion()} /> */}
      </Form.Group>
      <Button onSubmit={onSubmit}>Add</Button>
      <Button onClick={setShowAddProjectItem}>Cancel</Button>
    </Form>
  );
};

export default ProjectItemForm;

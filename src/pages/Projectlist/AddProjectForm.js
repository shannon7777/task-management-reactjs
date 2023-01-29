import { Col, Row, Form, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";

const AddProjectForm = ({
  onChange,
  onSubmit,
  completionDate,
  setCompletionDate,
  formData
}) => {
  return (
    <Form className="border border-secondary shadow p-4 m-5 rounded">
      <Form.Group className="mb-3" controlId="formTitle">
        <h2>Create a New Project</h2>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className="shadow"
          type="title"
          name="title"
          value={formData.title}
          placeholder="Enter a title for your project"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="shadow"
          type="description"
          name="description"
          value={formData.description}
          placeholder="Describe this project"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDateOfCompletion">
        <Form.Label>Date of completion</Form.Label>
        <DatePicker
          className="btn btn-outline-success shadow"
          selected={completionDate}
          value={completionDate}
          onChange={(date) => setCompletionDate(date)}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          showPopperArrow={false}
          placeholderText="No completion date set"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
};
export default AddProjectForm;
